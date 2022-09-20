import { KnitServer as Knit } from "@rbxts/knit";
import { HttpService as HTTP, MarketplaceService as Market } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DiscordLogService: typeof DiscordLogService;
    }
}

const DiscordLogService = Knit.CreateService({
    Name: "DiscordLogService",
    WebhookURL: "https://discord.com/api/webhooks/1018775238265294909/rQl8twqI8mb3S6c6qqlzZ1rL7A-rvIi7Gu484Fd1I-B34M1G66brf8vdaYJYi2b-S6Nv",
    ApiURL: "https://bloxrank.net/api/webhook/",

    Client: {
        Log(plr: Player, message: string, logType: string): void {
            return this.Server.Log(plr, message, logType);
        },
    },

    Log(player: Player, message: string, logType: string): void {
        // if (Runtime.IsStudio()) return;
        const data = HTTP.JSONEncode({
            WebhookURL: this.WebhookURL,
            WebhookData: {
                username: "UFG Logger",
                embeds: [
                    {
                        title: logType,
                        author: {
                            name: player.Name,
                            //icon_url: thumb,
                            url: "https://www.roblox.com/users/" + player.UserId + "/profile"
                        },
                        thumbnail: {
                            url: "https://tr.rbxcdn.com/e050e25b323f297edd69ca76cd0fe5f1/150/150/Image/Png"
                        },
                        description: message,
                        timestamp: DateTime.now().ToIsoDate(),
                        color: 0xe09f36
                    }
                ]
            }
        });
        
        xpcall(
            () => HTTP.PostAsync(this.ApiURL, data, Enum.HttpContentType.ApplicationJson),
            e => Logger.HttpError(e)
        );
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
    }
});

export = DiscordLogService;