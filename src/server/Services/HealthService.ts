import { KnitServer as Knit } from "@rbxts/knit";
import { Players } from "@rbxts/services";
import { Character } from "shared/Classes/Character";

declare global {
    interface KnitServices {
        HealthService: typeof HealthService;
    }
}

const HealthService = Knit.CreateService({
    Name: "HealthService",

    KnitStart() {
        Players.PlayerAdded.Connect(p => {
            const chars = Knit.GetService("CharacterService");
            const data = Knit.GetService("DataService");
            data.DataUpdated.Connect((plr: Player, name: string, equippedChar) => {
                if (name === "equippedCharacter" && p === plr) {
                    task.delay(5, () => {
                        const char = chars.GetFromParty(plr, <number>equippedChar);
                        const plrChar = plr.Character || plr.CharacterAdded.Wait()[1];
                        const hum = <Humanoid>plrChar?.WaitForChild("Humanoid")!;
                        hum.MaxHealth = char.State.Stats.MaxHealth;
                        hum.Health = char.State.Stats.Health;
                    });
                }
            });
        });
    },
});

export = HealthService;