import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitControllers {
        MainController: typeof MainController;
    }
}

const MainController = Knit.CreateController({
    Name: "MainController",

    IsInUI(): boolean {
        const pgui = WaitFor<PlayerGui>(Player, "PlayerGui");
        return !pgui.UI.MainGame.HUD.Visible
    },

    KnitStart(): void {
        Replicated.Network.PlayerIsInUI.OnClientInvoke = () => this.IsInUI();
    }
});

export = MainController;