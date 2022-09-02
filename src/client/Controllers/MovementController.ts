import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Debris, ReplicatedStorage, UserInputService as Input, Workspace as World } from "@rbxts/services";
import WaitFor from "shared/Util/WaitFor";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        MovementController: typeof MovementController;
    }
}

const state = {
    dash: false
};

const cooldowns = {
    dash: 1.4
};

const anims = ReplicatedStorage.WaitForChild("Assets").WaitForChild("Animations").WaitForChild("Main");
const dashAnim = WaitFor<Animation>(anims, "Dash");

function getModelMass(model: Model): number {
    let mass = 0;
    for (const part of model.GetChildren().filter(i => i.IsA("BasePart")))
        mass += (<BasePart>part).GetMass();

    return mass;
}

const MovementController = Knit.CreateController({
    Name: "MovementController",

    SetMode(movementMode: keyof typeof state): void {
        if (Player.GetAttribute("Jumping")) return;
        if (state[movementMode]) return;
        state[movementMode] = true;

        const char = Player.Character ?? Player.CharacterAdded.Wait()[0];
        const hum = WaitFor<Humanoid>(char, "Humanoid");
        const root = char.PrimaryPart!;

        switch(movementMode) {
            case "dash": {
                const velocity = new Instance("BodyVelocity");
                velocity.MaxForce = new Vector3(20000, 20000, 20000);
                velocity.P = 1550;
                velocity.Velocity = root.CFrame.LookVector.mul(35).sub(new Vector3(0, getModelMass(char) * World.Gravity * .01, 0));
                velocity.Parent = root;
                Debris.AddItem(velocity, .35);
                
                // const track = hum.LoadAnimation(dashAnim);
                // track.Play();
                break;
            }
            default: Logger.UnhandledCase("Attempt to set invalid movement mode: " + movementMode);
        }

        task.delay(cooldowns[movementMode], () => state[movementMode] = false);
    },
    
    //climb?? glide?

    GetState(): typeof state {
        return state;
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        task.spawn(() => {
            const menu = WaitFor<Frame>(Player.WaitForChild("PlayerGui").WaitForChild("UI"), "MainMenu");
            Input.InputBegan.Connect(({ UserInputType: itype }) => {
                if (!menu.GetAttribute("Completed")) return;
                if (itype === Enum.UserInputType.MouseButton2)
                    this.SetMode("dash");
            });
        });
    }
});

export = MovementController;