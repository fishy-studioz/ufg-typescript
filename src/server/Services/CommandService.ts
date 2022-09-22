import { KnitServer as Knit } from "@rbxts/knit";
import { Players, RunService as Runtime } from "@rbxts/services";
import { Command } from "../Classes/Command";
import { GetCommandList } from "../Classes/CommandList";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        CommandService: typeof CommandService;
    }
}



const CommandService = Knit.CreateService({
    Name: "CommandService",
    
    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        const discord = Knit.GetService("DiscordLogService");
        const cmdPerms = Knit.GetService("CommandPermissionService");

        const commandList = GetCommandList(discord); 
        const commands = new Map<string, Command>(commandList);
        const prefix = ".";
        Players.PlayerAdded.Connect(plr =>
            plr.Chatted.Connect(text => {
                const msg = <string>text;
                const args = msg.split(" ");
                const cmdName = args[0].split(prefix)[1];
                args.shift();
                
                const cmd = this.FindCommand(commands, cmdName);
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

    FindCommand(commands: Map<string, Command>, cmdName: string): Command | undefined {
        let cmd = commands.get(cmdName);
        if (!cmd)
            commands.forEach(c => {
                if (!c.Aliases.includes(cmdName)) return;
                cmd = c;
            });

        return cmd;
    }
});

export = CommandService;