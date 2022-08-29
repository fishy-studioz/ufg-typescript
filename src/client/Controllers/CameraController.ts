import { KnitClient as Knit } from "@rbxts/knit";
import { RunService as Runtime, UserInputService as Input} from "@rbxts/services";
import { CameraMode } from "client/Classes/CameraMode";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        CameraController: typeof CameraController;
    }
}
let mode = CameraMode.Unlocked;
const CameraController = Knit.CreateController({
    Name: "CameraController",

    GetModes(): typeof CameraMode {
        return CameraMode;
    },

    SetMode(newMode: CameraMode): void {
        mode = newMode;
    },

    Update(dt: number): void {
        if (mode === CameraMode.Unlocked) {
            Input.MouseBehavior = Enum.MouseBehavior.Default;
            Input.MouseIconEnabled = true;
        } else {
            Input.MouseBehavior = Enum.MouseBehavior.LockCenter;
            Input.MouseIconEnabled = false;
        }
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        Runtime.RenderStepped.Connect(dt => this.Update(dt));
    }
});

export = CameraController;