import { Permission } from "./Permission";

export class Command {
    public constructor(
        public readonly Name: string,
        public readonly PermissionLevel: Permission,
        public readonly Aliases: string[],
        private readonly callback: (plr: Player, args: string[]) => void
    ) { }

    public Run(plr: Player, args: string[]): void {
        this.callback(plr, args);
    }
}
