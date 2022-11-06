import { KnitClient as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        SettingsController: typeof SettingsController;
    }
}

const SettingsController = Knit.CreateController({
    Name: "SettingsController",

    KnitStart() {
        const settings = Knit.GetService("SettingsService");
        const graphics = Knit.GetController("GraphicsController");
        const volume = Knit.GetController("VolumeController");
        settings.Updated.Connect(data => {
            graphics.Update(data);
            volume.Update(data);
        });

        Logger.ComponentActive(script.Name);
        Logger.ComponentActive("GraphicsController");
        Logger.ComponentActive("ControlsController");
        Logger.ComponentActive("VolumeController");
    }
});

export = SettingsController;