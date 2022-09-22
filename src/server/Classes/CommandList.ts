import { KnitServer as Knit } from "@rbxts/knit";
import { MessagingService as Messaging, Players, ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";
import { Permission } from "./Permission";
import { Command } from "./Command";
import BanService from "@rbxts/ban-service";
import WaitFor from "shared/Util/WaitFor";

const sendConsoleMsg = WaitFor<RemoteEvent>(ReplicatedStorage, "SendConsoleMsg");
const reply = (plr: Player, msg: string) => sendConsoleMsg.FireClient(plr, msg);
export function GetCommandList(discord: typeof Knit.Services.DiscordLogService): [string, Command][] {
    return [
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
                    const version = WaitFor<StringValue>(ReplicatedFirst, "GameVersion");
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
                    if (!targetPlayer)
                        return reply(plr, "Provided no target to kick.");
    
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
                    if (!targetPlayer)
                        return reply(plr, "Provided no target to ban.");
    
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
                (plr, [targetId]) => {
                    if (!targetId || !tonumber(targetId))
                        return reply(plr, "Provided no target to unban.");
    
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
                    if (!msg || msg === "")
                        return reply(plr, "Please input a valid message to broadcast.");
                    const [success, err] = pcall(() => Messaging.PublishAsync("DevNotify", msg));
                    reply(plr, success ? "Successfully sent notification." : "Failed to send notification: " + tostring(err));
                }
            )
        ]
    ];    
}