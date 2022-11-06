import { KnitClient as Knit } from "@rbxts/knit";
import { DefaultData } from "shared/Classes/DefaultData";

declare global {
    interface KnitControllers {
        ControlsController: typeof ControlsController;
    }
}

const ControlsController = Knit.CreateController({
    Name: "ControlsController",

    Update(settings: typeof DefaultData.Settings): void {
        
    }
});

export = ControlsController;