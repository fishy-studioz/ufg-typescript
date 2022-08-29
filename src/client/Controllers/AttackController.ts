import { KnitClient as Knit } from "@rbxts/knit";

declare global {
    interface KnitControllers {
        AttackController: typeof AttackController;
    }
}

const AttackController = Knit.CreateController({
    Name: "AttackController",

    KnitStart(): void {
        const input = Knit.GetController("InputController");
    }
});

export = AttackController;