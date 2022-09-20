import { KnitServer as Knit } from "@rbxts/knit";
import { Players, RunService as Runtime } from "@rbxts/services";

declare global {
    interface KnitServices {
        RegenService: typeof RegenService;
    }
}

const RegenService = Knit.CreateService({
    Name: "RegenService",

    KnitInit(): void {
        Players.PlayerAdded.Connect(plr =>
            plr.CharacterAdded.Connect(char => {
                const humanoid = <Humanoid>char.WaitForChild("Humanoid");
                const regenScript = <Script>char.WaitForChild("Health");
                regenScript.Destroy();
                
                const maxHealth = humanoid.MaxHealth;
                let damagedRecently = false;
                let regenning = false;
                let lastHealth = humanoid.Health;

                humanoid.HealthChanged.Connect(hp => {
                    damagedRecently = hp < lastHealth;
                    if (damagedRecently || lastHealth === maxHealth) task.delay(4.5, () => damagedRecently = false);
                    lastHealth = hp;
                });

                Runtime.Heartbeat.Connect(dt => {
                    regenning = false;
                    if (humanoid.Health === maxHealth) {
                        damagedRecently = false;
                        return;
                    }
                    if (!damagedRecently) {
                        regenning = true;
                        humanoid.Health += (1.5 * dt);
                        //lastHealth = humanoid.Health;
                    }
                });
            })  
        );
    }
});

export = RegenService;