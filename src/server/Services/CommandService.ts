import { KnitServer as Knit } from "@rbxts/knit";
import { MessagingService as Messaging, Players, ReplicatedFirst, ReplicatedStorage, RunService as Runtime } from "@rbxts/services";
import { Command } from "../Classes/Command";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";
import { Permission } from "server/Classes/Permission";

declare global {
    interface KnitServices {
        CommandService: typeof CommandService;
    }
}

const net = WaitFor<Folder>(ReplicatedStorage, "Network")
const sendConsoleMsg = WaitFor<RemoteEvent>(net, "SendConsoleMsg");
const reply = (plr: Player, msg: string) => sendConsoleMsg.FireClient(plr, msg);
// const data = Knit.GetService("DataService");
const CommandService = Knit.CreateService({
    Name: "CommandService",
    Commands: new Map<string, Command>([
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
            "notify",
            new Command("notify", 
                Permission.Developer,
                ["announce", "broadcast", "notif"], 
                (plr, args) => {
                    const msg = args.join(" ");
                    if (!msg || msg === "") return reply(plr, "Please input a valid message to broadcast.");
                    const [ success, err ] = pcall(() => Messaging.PublishAsync("DevNotif", msg));
                    if (success)
                        reply(plr, "Successfully sent notification.");
                    else
                        reply(plr, "Failed to send notification: " + err);
                }
            )
        ]
    ]),
    
    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        const discord = Knit.GetService("DiscordLogService");
        const cmdPerms = Knit.GetService("CommandPermissionService");
        const prefix = ".";
        Players.PlayerAdded.Connect(plr =>
            plr.Chatted.Connect(text => {
                const msg = <string>text;
                const args = msg.split(" ");
                const cmdName = args[0].split(prefix)[1];
                args.shift();
                
                const cmd = this.FindCommand(cmdName);
                const canUse = Runtime.IsStudio() || (cmd ? cmdPerms.CanUse(plr, cmd) : false);
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