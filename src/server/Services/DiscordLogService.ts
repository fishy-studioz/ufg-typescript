import { KnitServer as Knit } from "@rbxts/knit";
import { HttpService as HTTP, RunService as Runtime } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DiscordLogService: typeof DiscordLogService;
    }
}

const DiscordLogService = Knit.CreateService({
    Name: "DiscordLogService",
    WebhookURL: "https://discord.com/api/webhooks/1012690289984540743/5bJCjlw5ZOi7CHRBC9nrmHsy6vRJwIuZUCWskHYpt779gvm-ASx1wPkDXvZcI32fc0Zt",
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
                username: "Untitled RPG Game Logger",
                embeds: [
                    {
                        title: logType,
                        author: {
                            name: player.Name,
                            //icon_url: thumb,
                            url: "https://www.roblox.com/users/" + player.UserId + "/profile"
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