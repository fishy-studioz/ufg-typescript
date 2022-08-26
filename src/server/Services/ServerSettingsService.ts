import { KnitServer as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        ServerSettingsService: typeof ServerSettingsService;
    }
}

const ServerSettingsService = Knit.CreateService({
    Name: "ServerSettingsService",

    KnitStart(): void {
        Logger.ComponentActive(script.Name)
    }
});

export = ServerSettingsService;