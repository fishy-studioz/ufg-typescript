import { KnitClient as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        MainController: typeof MainController;
    }
}

const MainController = Knit.CreateController({
    Name: "MainController",

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
    }
});

export = MainController;