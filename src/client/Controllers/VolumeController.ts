import { KnitClient as Knit } from "@rbxts/knit";
import { ReplicatedFirst, ReplicatedStorage, SoundService as Sound, Workspace as World } from "@rbxts/services";
import { DefaultData } from "shared/Classes/DefaultData";

declare global {
    interface KnitControllers {
        VolumeController: typeof VolumeController;
    }
}

const VolumeController = Knit.CreateController({
    Name: "VolumeController",

    Update(settings: typeof DefaultData.Settings): void {
        function setVolume(sound: Instance): void {
            if (sound?.IsA("Sound")) {
                sound.Volume *= (settings.Audio[sound.GetAttribute("Music") ? "Music" : "Effects"] / 100) + .5;
                sound.Volume *= (settings.Audio.Master / 100) + .5;
            }
        }

        for (const instance of ReplicatedFirst.GetDescendants())
            setVolume(instance);
        for (const instance of ReplicatedStorage.GetDescendants())
            setVolume(instance);
        for (const instance of World.GetDescendants())
            setVolume(instance);
        for (const instance of Sound.GetDescendants())
            setVolume(instance);
    }
});

export = VolumeController;