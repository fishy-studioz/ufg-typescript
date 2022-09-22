import { KnitServer as Knit } from "@rbxts/knit";
import { MessagingService as Messaging, Players, ReplicatedFirst, ReplicatedStorage, RunService as Runtime } from "@rbxts/services";
import { Permission } from "../Classes/Permission";
import { Command } from "../Classes/Command";
import BanService from "robloxts-banservice";
import WaitFor from "shared/Util/WaitFor";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        CommandService: typeof CommandService;
    }
}

const sendConsoleMsg = WaitFor<RemoteEvent>(ReplicatedStorage, "SendConsoleMsg");
const reply = (plr: Player, msg: string) => sendConsoleMsg.FireClient(plr, msg);
let discord: typeof Knit.Services.DiscordLogService;
const CommandService = Knit.CreateService({
    Name: "CommandService",
    Commands: new Map<string, Command>([
        [
            "ping", 
            new Command("ping", 
                Permission.Player,
                ["pingcheck", "pong"], 
                (plr) => reply(plr, "Pong!")
            )
        ],
        [
            "version", 
            new Command("version", 
                Permission.Player,
                ["ver", "vers", "v", "gameversion"], 
                (plr) => {
                    const version = WaitFor<StringValue>(ReplicatedFirst, "GameVersion")
                    reply(plr, version.Value);
                }
            )
        ],
        [
            "kick", 
            new Command("kick", 
                Permission.Developer,
                ["kickout", "remove", "bye"], 
                (plr, args) => {
                    const target = args[0] ?? "";
                    args.shift();
                    let reason = args.join(" ");
                    reason = args.size() === 0 ? `You have been kicked by ${plr.Name}.` : reason;
                    const targetPlayer = <Player>Players.FindFirstChild(target);
                    if (!targetPlayer) return reply(plr, "Provided no target to kick.");

                    targetPlayer.Kick(reason);
                    reply(plr, `Successfully kicked ${targetPlayer.Name}.`);
                    discord.Log(plr, `${targetPlayer.Name} was kicked for ${reason}.`, "Moderation");
                }
            )
        ],
        [
            "ban", 
            new Command("ban", 
                Permission.Developer,
                ["banish", "pban", "permban"], 
                (plr, args) => {
                    const target = args[0] ?? "";
                    args.shift();
                    let reason = args.join(" ");
                    reason = args.size() === 0 ? `You have been banned by ${plr.Name}.` : reason;
                    const targetPlayer = <Player>Players.FindFirstChild(target);
                    if (!targetPlayer) return reply(plr, "Provided no target to ban.");

                    BanService.Ban(targetPlayer, reason);
                    reply(plr, `Successfully banned ${targetPlayer.Name}.`);
                    discord.Log(plr, `${targetPlayer.Name} was banned for ${reason}.`, "Moderation");
                }
            )
        ],
        [
            "unban", 
            new Command("unban", 
                Permission.Developer,
                ["unbanish", "unpban", "unpermban"], 
                (plr, [ targetId ]) => { //userid
                    if (!targetId || !tonumber(targetId)) return reply(plr, "Provided no target to unban.");

                    BanService.Unban(tonumber(targetId)!);
                    reply(plr, `Successfully unbanned ${targetId}.`);
                    discord.Log(plr, `${targetId} was unbanned.`, "Moderation");
                }
            )
        ],
        [
            "notify",
            new Command("notify", 
                Permission.Developer,
                ["announce", "broadcast", "notif"], 
                (plr, args) => {
                    const msg = args.join(" ");
                    if (!msg || msg === "") return reply(plr, "Please input a valid message to broadcast.");
                    const [ success, err ] = pcall(() => Messaging.PublishAsync("DevNotify", msg));
                    reply(plr, success ? "Successfully sent notification." : "Failed to send notification: " + tostring(err));
                }
            )
        ]
    ]),
    
    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        discord = Knit.GetService("DiscordLogService");
        const cmdPerms = Knit.GetService("CommandPermissionService");
        const prefix = ".";
        Players.PlayerAdded.Connect(plr =>
            plr.Chatted.Connect(text => {
                const msg = <string>text;
                const args = msg.split(" ");
                const cmdName = args[0].split(prefix)[1];
                args.shift();
                
                const cmd = this.FindCommand(cmdName);
                let canUse = cmd ? cmdPerms.CanUse(plr, cmd) : false;
                if (Runtime.IsStudio() && !canUse && cmd)
                    canUse = true;

                if (cmd && canUse) {
                    discord.Log(plr, "Running command: " + cmd.Name + (args.size() > 0 ? " with args [" + args.join(", ") + "]" : ""), "Command Executed");
                    cmd.Run(plr, args);
                }
            })
        );
    },

    FindCommand(cmdName: string): Command | undefined {
        let cmd = this.Commands.get(cmdName);
        if (!cmd)
            this.Commands.forEach(c => {
                if (!c.Aliases.includes(cmdName)) return;
                cmd = c;
            });

        return cmd;
    }
});

export = CommandService;