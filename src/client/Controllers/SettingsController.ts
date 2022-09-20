import { KnitClient as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        SettingsController: typeof SettingsController;
    }
}

const SettingsController = Knit.CreateController({
    Name: "SettingsController",

    KnitInit() {
    },

    KnitStart() {
        Logger.ComponentActive(script.Name);
    },
});

export = SettingsController;