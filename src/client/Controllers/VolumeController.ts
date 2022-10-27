import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { ReplicatedFirst, ReplicatedStorage, SoundService as Sound, Workspace as World } from "@rbxts/services";
import { DefaultData } from "shared/Classes/DefaultData";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        VolumeController: typeof VolumeController;
    }
}

const VolumeController = Knit.CreateController({
    Name: "VolumeController",

    UpdateSounds(settings: typeof DefaultData.Settings): void {
        function setVolume(sound: Instance): void {
            if (sound?.IsA("Sound")) {
                if (sound.GetAttribute("Effects"))
                    sound.Volume *= (settings.Audio.Effects / 100) + .5;
                if (sound.GetAttribute("Music"))
                    sound.Volume *= (settings.Audio.Music / 100) + .5;
                
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
    },

    Set(volumeType: "Master" | "Effects" | "Music", value: number): void {
        const settings = Knit.GetService("SettingsService");
        const settingsData = settings.Get();
        if (settingsData) {
            settingsData.Audio[volumeType] = value;
            settings.Set(settingsData);
        }
    },

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        
        const settings = Knit.GetService("SettingsService");
        settings.Updated.Connect(opts => this.UpdateSounds(opts));
    }
});

export = VolumeController;