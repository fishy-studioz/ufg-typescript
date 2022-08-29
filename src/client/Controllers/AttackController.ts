import { KnitClient as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        AttackController: typeof AttackController;
    }
}

const AttackController = Knit.CreateController({
    Name: "AttackController",

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        const input = Knit.GetController("InputController");
    }
});

export = AttackController;