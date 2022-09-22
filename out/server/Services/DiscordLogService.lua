-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local HTTP = TS.import(script, TS.getModule(script, "@rbxts", "services")).HttpService
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local thumbnails = {
	Money = "https://c.tenor.com/ky28Tza5fHkAAAAM/wwe-cash.gif",
	DiscordMod = "https://c.tenor.com/yGp4tSzlYkgAAAAC/fat-gamer-playing.gif",
	OnePiece = "https://i.kym-cdn.com/photos/images/newsfeed/002/430/071/0f9.jpg",
}
local DiscordLogService = Knit.CreateService({
	Name = "DiscordLogService",
	WebhookURL = "https://hooks.hyra.io/api/webhooks/1018775238265294909/rQl8twqI8mb3S6c6qqlzZ1rL7A-rvIi7Gu484Fd1I-B34M1G66brf8vdaYJYi2b-S6Nv",
	Client = {
		Log = function(self, plr, message, logType, thumbnail)
			return self.Server:Log(plr, message, logType, thumbnail)
		end,
	},
	Log = function(self, player, message, logType, thumbnail)
		-- if (Runtime.IsStudio()) return;
		local data = HTTP:JSONEncode({
			WebhookURL = self.WebhookURL,
			WebhookData = {
				username = "UFG Logger",
				content = "can we get much higher <@611145159203094529>",
				allowed_mentions = {
					users = { "611145159203094529" },
				},
				embeds = { {
					title = logType,
					author = {
						name = player.Name,
						url = "https://www.roblox.com/users/" .. tostring(player.UserId) .. "/profile",
					},
					thumbnail = {
						url = thumbnails[thumbnail or "Money"],
					},
					description = message,
					timestamp = DateTime.now():ToIsoDate(),
					color = 0xe09f36,
				} },
			},
		})
		xpcall(function()
			return HTTP:PostAsync(self.WebhookURL, data)
		end, function(e)
			return Logger:HttpError(e)
		end)
	end,
	KnitInit = function(self)
		Logger:ComponentActive(script.Name)
	end,
})
return DiscordLogService
