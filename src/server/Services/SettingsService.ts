import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";
import { Players } from "@rbxts/services";
import { DefaultData } from "shared/Classes/DefaultData";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        SettingsService: typeof SettingsService;
    }
}

const SettingsService = Knit.CreateService({
    Name: "SettingsService",

    Client: {
        Updated: new RemoteSignal<(newSettings: typeof DefaultData.Settings) => void>(),
        Get(player: Player): typeof DefaultData.Settings | undefined {
            return this.Server.Get(player);
        },
        SetVolume(player: Player, volumeType: "Master" | "Effects" | "Music", value: number): void {
            this.Server.SetVolume(player, volumeType, value);
        },
        Set(player: Player, settings: typeof DefaultData.Settings): void {
            this.Server.Set(player, settings);
        }
    },

    Get(player: Player): typeof DefaultData.Settings | undefined {
        const data = Knit.GetService("DataService");
        const profile = data.GetProfile(player);
        return profile?.Data.Settings;
    },

    SetVolume(player: Player, volumeType: "Master" | "Effects" | "Music", value: number): void {
        const data = Knit.GetService("DataService");
        const profile = data.GetProfile(player);
        profile!.Data.Settings.Volume[volumeType] = value;
    },

    Set(player: Player, settings: typeof DefaultData.Settings): void {
        const data = Knit.GetService("DataService");
        const profile = data.GetProfile(player);
        profile!.Data.Settings = settings;
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name)
        Players.PlayerAdded.Connect(plr => this.Client.Updated.Fire(plr, this.Get(plr)!));
    }
});

export = SettingsService;