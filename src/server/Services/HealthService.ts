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
        let firstTime = true;
        Players.PlayerAdded.Connect(p => {
            let conn: RBXScriptConnection;
            conn = p.CharacterAdded.Connect(plrChar => {
                const data = Knit.GetService("DataService");
                const chars = Knit.GetService("CharacterService");
                data.DataUpdated.Connect((plr: Player, name: string, equippedChar) => {
                    if (name === "equippedCharacter" && p === plr) {
                        task.spawn(() => {
                            if (firstTime) {
                                task.wait(3);
                                firstTime = false;
                            }
                            const partySetup = <string[]>data.Get(plr, "partySetup");
                            const charName = partySetup[<number>equippedChar - 1];
                            const char = chars.GetData(charName)!;
                            const hum = plrChar?.FindFirstChildOfClass("Humanoid")!;
                            hum.MaxHealth = char.State.Stats.MaxHealth;
                            hum.Health = char.State.Stats.Health;
                        });
                    }
                });
                conn.Disconnect();
            });
        });
    },
});

export = HealthService;