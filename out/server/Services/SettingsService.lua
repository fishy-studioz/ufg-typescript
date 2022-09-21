-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local SettingsService = Knit.CreateService({
	Name = "SettingsService",
	Client = {
		Updated = RemoteSignal.new(),
		Get = function(self, player)
			return self.Server:Get(player)
		end,
		Set = function(self, player, settings)
			self.Server:Set(player, settings)
		end,
	},
	Get = function(self, player)
		local data = Knit.GetService("DataService")
		local profile = data:GetProfile(player)
		local _result = profile
		if _result ~= nil then
			_result = _result.Data.Settings
		end
		return _result
	end,
	Set = function(self, player, settings)
		local data = Knit.GetService("DataService")
		local profile = data:GetProfile(player)
		profile.Data.Settings = settings
	end,
	KnitInit = function(self)
		Logger:ComponentActive(script.Name)
		Players.PlayerAdded:Connect(function(plr)
			return self.Client.Updated:Fire(plr, self:Get(plr))
		end)
	end,
})
return SettingsService
