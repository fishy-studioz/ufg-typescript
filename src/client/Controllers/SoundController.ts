import { KnitClient as Knit } from "@rbxts/knit";
import { SoundService as Sound, Workspace as World } from "@rbxts/services";
import StrictMap from "shared/Util/StrictMap";
import WaitFor from "shared/Util/WaitFor";
import Find from "shared/Util/Find";
import RandomElement from "shared/Util/RandomElement";

declare global {
    interface KnitControllers {
        SoundController: typeof SoundController;
    }
}

const SoundController = Knit.CreateController({
    Name: "SoundController",
    RegisteredSounds: new StrictMap<string, number[]>(),

    Load(name: string, ...ids: number[]): void {
        this.RegisteredSounds.Set(name, ids);
    },

    Play(name: string, vol?: number, pitch?: number, timePos?: number, parent?: Instance): void { //add queue system or something but works for now ig
        const ids = this.RegisteredSounds.Get(name);
        const id = RandomElement(ids);
        const sound = new Instance("Sound");
        sound.SoundId = tostring(id);
        sound.Volume = vol ?? 1;
        sound.Pitch = pitch ?? 1;
        sound.TimePosition = timePos ?? 0;
        sound.Parent = parent ?? World;
        sound.Ended.Connect(() => sound.Destroy());
        sound.Play();
    },

    UI(name: string): void {
        const ui = WaitFor<SoundGroup>(Sound, "UI");
        const sound = Find<Sound>(ui, name);
        if (sound)
            sound.Play();
    }
});

export = SoundController;