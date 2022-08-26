import { KnitServer as Knit } from "@rbxts/knit";
import { Chat, Players, ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitServices {
        CommandService: typeof CommandService;
    }
}

class Command {
    public constructor(
        public readonly Aliases: string[],
        private readonly callback: (plr: Player, args: string[]) => void
    ) {}

    public Run(plr: Player, args: string[]): void {
        this.callback(plr, args);
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
            new Command(["ver", "vers", "v", "gameversion"], (plr) => {
                const version = WaitFor<StringValue>(ReplicatedFirst, "GameVersion")
                reply(plr, version.Value);
            })
        ]
    ]),
    
    KnitStart(): void {
        Logger.ComponentActive(script.Name)
        const prefix = ".";
        Chat.Chatted.Connect((p, text) => {
            if (!(p && p.Parent && p.Parent.FindFirstChildOfClass("Humanoid"))) return;
            const plr = Players.GetPlayerFromCharacter(p.Parent)!
            const msg = <string>text;
            const args = msg.split(" ");
            const cmdName = args[0].split(prefix)[1];
            args.shift();
            
            const cmd = this.FindCommand(cmdName);
            cmd?.Run(plr, args);
        });
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