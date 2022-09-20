import { KnitServer as Knit } from "@rbxts/knit";
import { Players } from "@rbxts/services";
import { Profile } from "@rbxts/profileservice/globals";
import { DefaultData } from "shared/Classes/DefaultData";
import ProfileService from "@rbxts/profileservice";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DataService: typeof DataService;
    }
}

type DataType = typeof DefaultData;
const profiles = new Map<Player, Profile<DataType> | undefined>();
const DataService = Knit.CreateService({
    Name: "DataService",
    Profiles: profiles,
    PlayerDataStore: ProfileService.GetProfileStore("PlayerData", DefaultData),

    GetProfile(player: Player): Profile<DataType> | undefined {
        return this.Profiles.get(player);
    },

    KnitStart(): void {
        Logger.ComponentActive("DataService");
        const settings = Knit.GetService("SettingsService");
        const playerAdded = (player: Player) => {
            const playerData = this.PlayerDataStore.LoadProfileAsync("Player_" + player.UserId);
            if (playerData !== undefined) {
                playerData.AddUserId(player.UserId); // GDPR compliance
                playerData.Reconcile(); // Fill in missing variables from ProfileTemplate (optional)
                playerData.ListenToRelease(() => {
                    this.Profiles.set(player, undefined);
                    // The profile could've been loaded on another Roblox server.
                    player.Kick();
                });
                if (player.IsDescendantOf(Players)) {
                    this.Profiles.set(player, playerData);
                    settings.Client.Updated.Fire(player, playerData.Data.Settings);
                    player.SetAttribute("CareerKills", playerData.Data.CareerKills);
                    player.SetAttribute("Tritocoins", playerData.Data.Tritocoins);
                } else
                    playerData.Release();
            } else
                player.Kick();
        };

        for (const player of Players.GetPlayers())
            task.spawn(playerAdded, player);

        //listen for data update and make sure settingsservice knows
        Players.PlayerAdded.Connect(playerAdded);
        Players.PlayerRemoving.Connect(player => this.GetProfile(player)?.Release());
    },
});

export = DataService;