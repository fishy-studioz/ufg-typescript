import { KnitClient as Knit } from "@rbxts/knit";
import { Lighting, Workspace as World } from "@rbxts/services";
import { DefaultData } from "shared/Classes/DefaultData";

declare global {
    interface KnitControllers {
        GraphicsController: typeof GraphicsController;
    }
}

const camera = World.CurrentCamera!;
const GraphicsController = Knit.CreateController({
    Name: "GraphicsController",

    Update({ Graphics: graphics }: typeof DefaultData.Settings): void {
        camera.FieldOfView = graphics.FOV
        
        Lighting.Brightness = graphics.Brightness / 100
        Lighting.GlobalShadows = graphics.Shadows;
        Lighting.EnvironmentSpecularScale = graphics.PBR ? Lighting.EnvironmentSpecularScale : 0
        // Lighting.EnvironmentDiffuseScale = graphics.PBR ? Lighting.EnvironmentDiffuseScale : 0
        for (const i of Lighting.GetChildren())
            if (i.IsA("PostEffect"))
                i.Enabled = graphics.PostProcessing
    },
});

export = GraphicsController;