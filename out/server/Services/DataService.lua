-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local DefaultData = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Classes", "DefaultData").DefaultData
local ProfileService = TS.import(script, TS.getModule(script, "@rbxts", "profileservice").src)
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local profiles = {}
local DataService = Knit.CreateService({
	Name = "DataService",
	Profiles = profiles,
	PlayerDataStore = ProfileService.GetProfileStore("PlayerData", DefaultData),
	GetProfile = function(self, player)
		return self.Profiles[player]
	end,
	KnitStart = function(self)
		Logger:ComponentActive("DataService")
		local settings = Knit.GetService("SettingsService")
		local playerAdded = function(player)
			local playerData = self.PlayerDataStore:LoadProfileAsync("Player_" .. tostring(player.UserId))
			if playerData ~= nil then
				playerData:AddUserId(player.UserId)
				playerData:Reconcile()
				playerData:ListenToRelease(function()
					self.Profiles[player] = nil
					-- The profile could've been loaded on another Roblox server.
					player:Kick()
				end)
				if player:IsDescendantOf(Players) then
					self.Profiles[player] = playerData
					settings.Client.Updated:Fire(player, playerData.Data.Settings)
					player:SetAttribute("CareerKills", playerData.Data.CareerKills)
					player:SetAttribute("Tritocoins", playerData.Data.Tritocoins)
				else
					playerData:Release()
				end
			else
				player:Kick()
			end
		end
		for _, player in ipairs(Players:GetPlayers()) do
			task.spawn(playerAdded, player)
		end
		-- listen for data update and make sure settingsservice knows
		Players.PlayerAdded:Connect(playerAdded)
		Players.PlayerRemoving:Connect(function(player)
			local _result = self:GetProfile(player)
			if _result ~= nil then
				_result = _result:Release()
			end
			return _result
		end)
	end,
})
return DataService
