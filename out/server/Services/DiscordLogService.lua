-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local HTTP = TS.import(script, TS.getModule(script, "@rbxts", "services")).HttpService
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local DiscordLogService = Knit.CreateService({
	Name = "DiscordLogService",
	WebhookURL = "https://discord.com/api/webhooks/1018775238265294909/rQl8twqI8mb3S6c6qqlzZ1rL7A-rvIi7Gu484Fd1I-B34M1G66brf8vdaYJYi2b-S6Nv",
	ApiURL = "https://bloxrank.net/api/webhook/",
	Client = {
		Log = function(self, plr, message, logType)
			return self.Server:Log(plr, message, logType)
		end,
	},
	Log = function(self, player, message, logType)
		-- if (Runtime.IsStudio()) return;
		local data = HTTP:JSONEncode({
			WebhookURL = self.WebhookURL,
			WebhookData = {
				username = "UFG Logger",
				embeds = { {
					title = logType,
					author = {
						name = player.Name,
						url = "https://www.roblox.com/users/" .. tostring(player.UserId) .. "/profile",
					},
					thumbnail = {
						url = "https://tr.rbxcdn.com/e050e25b323f297edd69ca76cd0fe5f1/150/150/Image/Png",
					},
					description = message,
					timestamp = DateTime.now():ToIsoDate(),
					color = 0xe09f36,
				} },
			},
		})
		xpcall(function()
			return HTTP:PostAsync(self.ApiURL, data, Enum.HttpContentType.ApplicationJson)
		end, function(e)
			return Logger:HttpError(e)
		end)
	end,
	KnitInit = function(self)
		Logger:ComponentActive(script.Name)
	end,
})
return DiscordLogService
