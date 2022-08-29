import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { RunService as Runtime } from "@rbxts/services";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitControllers {
        CombatController: typeof CombatController;
    }
}

const CombatController = Knit.CreateController({
    Name: "CombatController",

    NormalAttack(): void {
        Logger.Debug("Normal Attack");
    },

    ChargedAttack(): void {
        Logger.Debug("Charged Attack");
        //add forward velocity and anim + vfx
    },

    PlumitAttack(): void {
        Logger.Debug("Plumit Attack");
        //add velocities and anim + vfx
    },

    UseBurst(): void {
        Logger.Debug("Use Burst");
    },

    UseSkill(): void {
        Logger.Debug("Use Skill");
    },

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        const char = Player.Character ?? Player.CharacterAdded.Wait()[0];
        const hum = WaitFor<Humanoid>(char, "Humanoid");
        const input = Knit.GetController("InputController");

        let mouseDownTime = 0;
        Runtime.RenderStepped.Connect(dt => {
            if (input.IsMouseDown)
                mouseDownTime += dt;
        });

        let falling = false;
        hum.FreeFalling.Connect(active => falling = active);

        const { KeyCode: keys, UserInputType: itype } = Enum;
        input.KeyDown(keys.E, () => this.UseSkill());
        input.KeyDown(keys.Q, () => this.UseBurst());
        input.MouseDown(itype.MouseButton1, () => {
            if (falling)
                this.PlumitAttack();
            else
                this.NormalAttack();
        });
        input.MouseUp(itype.MouseButton1, () => {
            if (mouseDownTime >= 1)
                this.ChargedAttack();

            mouseDownTime = 0;
        });
    }
});

export = CombatController;