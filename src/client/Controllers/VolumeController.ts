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
                    sound.Volume *= (settings.Volume.Effects / 100) + .5;
                if (sound.GetAttribute("Music"))
                    sound.Volume *= (settings.Volume.Music / 100) + .5;
                
                sound.Volume *= (settings.Volume.Master / 100) + .5;
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

    KnitStart(): void {
        Logger.ComponentActive(script.Name);
        
        const settings = Knit.GetService("SettingsService");
        settings.Updated.Connect(opts => this.UpdateSounds(opts));
    }
});

export = VolumeController;