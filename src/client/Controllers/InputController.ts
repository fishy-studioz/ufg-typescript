import { KnitClient as Knit } from "@rbxts/knit";
import { UserInputService as UIS } from "@rbxts/services";

declare global {
    interface KnitControllers {
        InputController: typeof InputController;
    }
}

const InputController = Knit.CreateController({
    Name: "InputController",
    MouseDown: false,

    KnitInit(): void {
        UIS.InputBegan.Connect(({ UserInputType: itype }, processed) => {
            if (processed) return;
            if (itype === Enum.UserInputType.MouseButton1)
                this.MouseDown = true;
        });
        UIS.InputEnded.Connect(({ UserInputType: itype }, processed) => {
            if (processed) return;
            if (itype === Enum.UserInputType.MouseButton1)
                this.MouseDown = false;
        });
    }
});

export = InputController;