import { KnitServer as Knit } from "@rbxts/knit";
import { ReplicatedStorage as Replicated } from "@rbxts/services";

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
        return <boolean>Replicated.Network.PlayerIsInUI.InvokeClient(plr);
    }
});

export = PlayerStateService;