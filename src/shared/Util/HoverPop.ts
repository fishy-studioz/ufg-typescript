import { AnimatedButtonDefaults } from "shared/Util/AnimatedButton";
import { GetScaledUDim } from "./GetScaledUDim";
import { Tween } from "./Tween";

export function HoverPop(button: GuiButton, pop: number, spd: number) {
    const defaultGoal = {
        Size: button.Size,
        Position: button.Position
    };
    
    button.MouseEnter.Connect(() => HoverPopUp(button, pop, spd, defaultGoal));
    button.MouseLeave.Connect(() => HoverPopDown(button, spd, defaultGoal));
}

export function HoverPopUp(button: GuiButton, pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
    const popUDim = new UDim2(0, pop, 0, pop);
    const scaled: UDim2 = GetScaledUDim(button, popUDim);
    const popScale = new UDim2(
        scaled.X.Scale / 2, 0,
        scaled.Y.Scale / 2, 0
    );
    
    return Tween(button, info, {
        Size: defaultGoal.Size?.add(popUDim),
        Position: defaultGoal.Position?.sub(popScale)
    });
}

export function HoverPopDown(button: GuiButton, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
    return Tween(button, info, defaultGoal);
}