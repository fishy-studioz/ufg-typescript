import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        ServerSettingsService: typeof ServerSettingsService;
    }
}

const ServerSettingsService = Knit.CreateService({
    Name: "ServerSettingsService",
    
    Client: {
    },
});

export = ServerSettingsService;