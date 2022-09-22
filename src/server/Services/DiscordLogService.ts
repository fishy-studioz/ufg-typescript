import { KnitServer as Knit } from "@rbxts/knit";
import { HttpService as HTTP, MarketplaceService as Market } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DiscordLogService: typeof DiscordLogService;
    }
}

const thumbnails = {
    Money: "https://c.tenor.com/ky28Tza5fHkAAAAM/wwe-cash.gif",
    DiscordMod: "https://c.tenor.com/yGp4tSzlYkgAAAAC/fat-gamer-playing.gif",
    OnePiece: "https://i.kym-cdn.com/photos/images/newsfeed/002/430/071/0f9.jpg",
};

const DiscordLogService = Knit.CreateService({
    Name: "DiscordLogService",
    WebhookURL: "https://hooks.hyra.io/api/webhooks/1018775238265294909/rQl8twqI8mb3S6c6qqlzZ1rL7A-rvIi7Gu484Fd1I-B34M1G66brf8vdaYJYi2b-S6Nv",

    Client: {
        Log(plr: Player, message: string, logType: string, thumbnail?: keyof typeof thumbnails): void {
            return this.Server.Log(plr, message, logType, thumbnail);
        },
    },

    Log(player: Player, message: string, logType: string, thumbnail?: keyof typeof thumbnails): void {
        // if (Runtime.IsStudio()) return;
        const data = HTTP.JSONEncode({
            WebhookURL: this.WebhookURL,
            WebhookData: {
                username: "UFG Logger",
                content: "can we get much higher <@611145159203094529>",
                allowed_mentions: {
                    users: [ "611145159203094529" ],
                },
                embeds: [
                    {
                        title: logType,
                        author: {
                            name: player.Name,
                            //icon_url: thumb,
                            url: "https://www.roblox.com/users/" + player.UserId + "/profile"
                        },
                        thumbnail: {
                            url: thumbnails[thumbnail ?? "Money"]
                        },
                        description: message,
                        timestamp: DateTime.now().ToIsoDate(),
                        color: 0xe09f36
                    }
                ]
            }
        });
        
        xpcall(
            () => HTTP.PostAsync(this.WebhookURL, data),
            e => Logger.HttpError(e)
        );
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
    }
});

export = DiscordLogService;