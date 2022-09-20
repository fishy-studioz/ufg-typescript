import { Tween } from "./Tween";

export function HoverColor<B extends GuiButton>(button: B, color: Color3, defaultColor: Color3, spd: number) {
    button.MouseEnter.Connect(() => button.IsA("ImageButton") ? HoverColorOn(button, color, spd) : HoverColorTextOn(button, color, spd));
    button.MouseLeave.Connect(() => button.IsA("ImageButton") ? HoverColorOff(button, defaultColor, spd) : HoverColorTextOff(button, defaultColor, spd));
}

export function HoverColorOn(button: ImageButton, color: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);    
    return Tween(button, info, {
        ImageColor3: color
    });
}

export function HoverColorOff(button: ImageButton, defaultColor: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
    return Tween(button, info, {
        ImageColor3: defaultColor
    });
}

export function HoverColorTextOn(button: GuiButton, color: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);    
    return Tween(button, info, {
        BackgroundColor3: color
    });
}

export function HoverColorTextOff(button: GuiButton, defaultColor: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
    return Tween(button, info, {
        BackgroundColor3: defaultColor
    });
}