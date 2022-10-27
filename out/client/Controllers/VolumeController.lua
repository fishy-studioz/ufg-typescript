-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedFirst = _services.ReplicatedFirst
local ReplicatedStorage = _services.ReplicatedStorage
local Sound = _services.SoundService
local World = _services.Workspace
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local VolumeController = Knit.CreateController({
	Name = "VolumeController",
	UpdateSounds = function(self, settings)
		local function setVolume(sound)
			local _result = sound
			if _result ~= nil then
				_result = _result:IsA("Sound")
			end
			if _result then
				local _value = sound:GetAttribute("Effects")
				if _value ~= 0 and (_value == _value and (_value ~= "" and _value)) then
					sound.Volume *= (settings.Audio.Effects / 100) + .5
				end
				local _value_1 = sound:GetAttribute("Music")
				if _value_1 ~= 0 and (_value_1 == _value_1 and (_value_1 ~= "" and _value_1)) then
					sound.Volume *= (settings.Audio.Music / 100) + .5
				end
				sound.Volume *= (settings.Audio.Master / 100) + .5
			end
		end
		for _, instance in ipairs(ReplicatedFirst:GetDescendants()) do
			setVolume(instance)
		end
		for _, instance in ipairs(ReplicatedStorage:GetDescendants()) do
			setVolume(instance)
		end
		for _, instance in ipairs(World:GetDescendants()) do
			setVolume(instance)
		end
		for _, instance in ipairs(Sound:GetDescendants()) do
			setVolume(instance)
		end
	end,
	Set = function(self, volumeType, value)
		local settings = Knit.GetService("SettingsService")
		local settingsData = settings:Get()
		if settingsData then
			settingsData.Audio[volumeType] = value
			settings:Set(settingsData)
		end
	end,
	KnitStart = function(self)
		Logger:ComponentActive(script.Name)
		local settings = Knit.GetService("SettingsService")
		settings.Updated:Connect(function(opts)
			return self:UpdateSounds(opts)
		end)
	end,
})
return VolumeController
