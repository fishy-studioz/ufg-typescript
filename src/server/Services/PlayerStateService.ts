import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        PlayerStateService: typeof PlayerStateService;
    }
}

const PlayerStateService = Knit.CreateService({
    Name: "PlayerStateService",

    Client: {
        IsInUI(plr: Player): boolean {
            return this.Server.IsInUI(plr);
        }
    },

    IsInUI(plr: Player): boolean {
        return false;
    }
});

export = PlayerStateService;