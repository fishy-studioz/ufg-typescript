import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { RunService as Runtime, UserInputService as UIS, Workspace as World} from "@rbxts/services";
import { CameraMode } from "client/Classes/CameraMode";
import { Tween } from "shared/Util/Tween";
import Logger from "shared/Logger";
import Limit from "shared/Util/Limit";

declare global {
    interface KnitControllers {
        CameraController: typeof CameraController;
    }
}
let mode = CameraMode.Unlocked;
const { EasingStyle: style, EasingDirection: direction } = Enum;
const CameraController = Knit.CreateController({
    Name: "CameraController",
    Cam: World.CurrentCamera!,
    MinZoom: 65, //fov
    MaxZoom: 95, //fov
    CurrentZoom: 50, //fov
    ZoomForce: 10, //fov increment
    ZoomSpeed: .17, //seconds

    GetModes(): typeof CameraMode {
        return CameraMode;
    },

    SetMode(newMode: CameraMode): void {
        mode = newMode;
    },

    Zoom(inUI: boolean, backwards = false): void {
        if (inUI) return;
        const fov = this.Cam.FieldOfView;
        const force = this.ZoomForce;
        const newFOV = Limit(fov + (backwards ? force : -force), this.MinZoom, this.MaxZoom);
        Tween(this.Cam, new TweenInfo(this.ZoomSpeed, style.Quad, direction.Out), { FieldOfView: newFOV });
    },

    Update(dt: number): void {
        if (mode === CameraMode.Unlocked) {
            UIS.MouseBehavior = Enum.MouseBehavior.Default;
            UIS.MouseIconEnabled = true;
        } else {
            UIS.MouseBehavior = Enum.MouseBehavior.LockCenter;
            UIS.MouseIconEnabled = false;
        }
    },

    KnitStart(): void {
        const mouse = Player.GetMouse();
        const playerState = Knit.GetService("PlayerStateService");
        const inUI = playerState.IsInUI();

        mouse.WheelForward.Connect(() => this.Zoom(inUI));
        mouse.WheelBackward.Connect(() => this.Zoom(inUI, true));
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        Runtime.RenderStepped.Connect(dt => this.Update(dt));
        this.Cam.FieldOfView = this.MinZoom
    },
});

export = CameraController;