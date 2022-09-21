import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { Players, RunService as Runtime } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        LagIdentificationService: typeof LagIdentificationService;
    }
}

const LagIdentificationService = Knit.CreateService({
    Name: "LagIdentificationService",

    StartedLagging: new Signal<(player: Player) => void>(),
    StoppedLagging: new Signal<(player: Player) => void>(),
    Client: {
        StartedLagging: new RemoteSignal<() => void>(),
        StoppedLagging: new RemoteSignal<() => void>(),
    },

    //wip untested prototype
    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        this.StartedLagging.Connect(plr => print(plr + " is lagging"));
        this.StoppedLagging.Connect(plr => print(plr + " is no longer lagging"));

        const lastPositions = new Map<string, Vector3>();
        const lagging = new Map<string, boolean>();
        Players.GetPlayers().forEach(plr => lagging.set(plr.Name, false));
        Runtime.PostSimulation.Connect(dt => {
            for (const plr of Players.GetPlayers()) {
                lastPositions.set(plr.Name, plr.Character!.PrimaryPart!.Position);
                const lastPos = lastPositions.get(plr.Name);
                const curPos = plr.Character?.PrimaryPart?.Position 
                if (lastPos && curPos) {
                    const dist = lastPos.sub(curPos).Magnitude;
                    const isLagging = lagging.get(plr.Name);
                    if (dist > 3 && !isLagging) {
                        lagging.set(plr.Name, true);
                        this.StartedLagging.Fire(plr);
                    } else if (dist <= 3 && isLagging) {
                        lagging.set(plr.Name, false);
                        this.StartedLagging.Fire(plr);
                    }
                }
            }
        });
    }
});

export = LagIdentificationService;