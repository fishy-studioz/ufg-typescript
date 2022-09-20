import { AnimatedButtonDefaults } from "shared/Util/AnimatedButton";
import { Pair } from "shared/Util/Pair";
import { GetScaledUDim } from "./GetScaledUDim";
import { Tween } from "./Tween";

export function ClickPop(button: GuiButton, pop: number, spd: number) {
    const defaultGoal = {
        Size: button.Size,
        Position: button.Position
    };

    button.MouseButton1Down.Connect(() => ClickPopDown(button, pop, spd, defaultGoal));
    button.MouseButton1Up.Connect(() => ClickPopUp(button, pop, spd, defaultGoal));
}

export function ClickPopUp(button: GuiButton, pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
    const info = new TweenInfo(spd / 2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

    function GetPop(): Pair<UDim2> {
        const popUDim = new UDim2(0, -pop, 0, -pop);
        const scaleUDim = GetScaledUDim(button, popUDim);
        const popScale = new UDim2(scaleUDim.X.Scale / 2, 0, scaleUDim.Y.Scale / 2, 0);
        return new Pair<UDim2>(popUDim, popScale);
    }

    const scalePair: Pair<UDim2> = GetPop();
    const popUDim = scalePair.First;
    const popScale = scalePair.Second;

    return Tween(button, info, {
        Size: defaultGoal.Size?.sub(popUDim),
        Position: defaultGoal.Position?.add(popScale)
    });
}

export function ClickPopDown(button: GuiButton, pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
    const info = new TweenInfo(spd / 2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

    function GetPop(): Pair<UDim2> {
        const popUDim = new UDim2(0, -pop, 0, -pop);
        const scaleUDim = GetScaledUDim(button, popUDim);
        const popScale = new UDim2(scaleUDim.X.Scale / 2, 0, scaleUDim.Y.Scale / 2, 0);
        return new Pair<UDim2>(popUDim, popScale);
    }

    const scalePair: Pair<UDim2> = GetPop();
    const popUDim = scalePair.First;
    const popScale = scalePair.Second;

    return Tween(button, info, {
        Size: defaultGoal.Size?.add(popUDim),
        Position: defaultGoal.Position?.sub(popScale)
    });
}