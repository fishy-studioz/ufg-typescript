import { KnitClient as Knit } from "@rbxts/knit";
import { Lighting } from "@rbxts/services";
import { DefaultData } from "shared/Classes/DefaultData";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        GraphicsController: typeof GraphicsController;
    }
}

const GraphicsController = Knit.CreateController({
    Name: "GraphicsController",

    Update({ Graphics: graphics }: typeof DefaultData.Settings): void {
        Lighting.GlobalShadows = graphics.Shadows;

        for (const i of Lighting.GetChildren())
            if (i.IsA("PostEffect"))
                i.Enabled = graphics.PostProcessing

        Lighting.EnvironmentSpecularScale = graphics.PBR ? Lighting.EnvironmentSpecularScale : 0
        Lighting.EnvironmentDiffuseScale = graphics.PBR ? Lighting.EnvironmentDiffuseScale : 0
    },

    Toggle(toggleableSetting: ExtractKeys<typeof DefaultData.Settings.Graphics, boolean>): boolean | undefined {
        const settings = Knit.GetService("SettingsService");
        const settingsData = settings.Get();
        if (settingsData) {
            const currentValue = settingsData.Graphics[toggleableSetting];
            if (type(currentValue) ===  "boolean") {
                settingsData.Graphics[toggleableSetting] = !currentValue;
                settings.Set(settingsData);
                return <boolean>settingsData.Graphics[toggleableSetting];
            } else {
                warn("attempt to toggle graphics setting that isnt a boolean");
                return;
            }
        }
    },

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        
        const settings = Knit.GetService("SettingsService");
        settings.Updated.Connect(opts => this.Update(opts));
    }
});

export = GraphicsController;