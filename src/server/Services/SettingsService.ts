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
        Set(player: Player, settings: typeof DefaultData.Settings): void {
            this.Server.Set(player, settings);
        },
        Update(player: Player): void {
            this.Server.Update(player);
        }
    },

    Get(player: Player): typeof DefaultData.Settings | undefined {
        const data = Knit.GetService("DataService");
        const profile = data.GetProfile(player);
        return profile?.Data.Settings;
    },

    Set(player: Player, settings: typeof DefaultData.Settings): void {
        const data = Knit.GetService("DataService");
        const profile = data.GetProfile(player);
        profile!.Data.Settings = settings;
    },

    Update(player: Player): void {
        const data = this.Get(player)!;
        this.Client.Updated.Fire(player, data);
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name)
    }
});

export = SettingsService;