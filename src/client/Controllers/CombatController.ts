import { KnitClient as Knit } from "@rbxts/knit";
import { RunService as Runtime } from "@rbxts/services";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitControllers {
        CombatController: typeof CombatController;
    }
}

let plumitDb = false
const CombatController = Knit.CreateController({
    Name: "CombatController",

    NormalAttack(inUI: boolean): void {
        if (inUI) return;
        Logger.Debug("Normal Attack");
    },

    ChargedAttack(inUI: boolean): void {
        if (inUI) return;
        Logger.Debug("Charged Attack");
        //add forward velocity and anim + vfx
    },

    PlumitAttack(inUI: boolean): void {
        if (inUI) return;
        if (plumitDb) return;
        plumitDb = true;

        Logger.Debug("Plumit Attack");
        //cooldown until landed + check if plr has been falling for more than a second or so
        //add velocities and anim + vfx
    },

    UseBurst(inUI: boolean): void {
        if (inUI) return;
        Logger.Debug("Use Burst");
    },

    UseSkill(inUI: boolean): void {
        if (inUI) return;
        Logger.Debug("Use Skill");
    },

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        const char = Player.Character ?? Player.CharacterAdded.Wait()[0];
        const hum = WaitFor<Humanoid>(char, "Humanoid");
        const input = Knit.GetController("InputController");
        const main = Knit.GetController("MainController");

        let mouseDownTime = 0;
        Runtime.RenderStepped.Connect(dt => {
            if (input.IsMouseDown)
                mouseDownTime += dt;
        });

        let falling = false;
        hum.FreeFalling.Connect(active => {
            falling = active;
            if (!falling)
                plumitDb = false;
        });

        const { KeyCode: keys, UserInputType: itype } = Enum;
        const inUI = main.IsInUI();

        input.KeyDown(keys.E, () => this.UseSkill(inUI));
        input.KeyDown(keys.Q, () => this.UseBurst(inUI));
        input.MouseUp(itype.MouseButton1, () => {
            if (inUI) return;

            if (mouseDownTime >= 1)
                this.ChargedAttack(inUI);
            else if (falling)
                this.PlumitAttack(inUI);
            else
                this.NormalAttack(inUI);

            mouseDownTime = 0;
        });
    }
});

export = CombatController;