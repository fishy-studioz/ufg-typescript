import { TweenService as Tweens } from "@rbxts/services";

export function Tween<T extends Instance = Instance>(i: T, ti: TweenInfo, goal: Partial<ExtractMembers<T, Tweenable>>): Tween {
    const tween: Tween = Tweens.Create(i, ti, goal);
    tween.Play();
    return tween;
}