-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedFirst = _services.ReplicatedFirst
local ReplicatedStorage = _services.ReplicatedStorage
local Sound = _services.SoundService
local World = _services.Workspace
local VolumeController = Knit.CreateController({
	Name = "VolumeController",
	Update = function(self, settings)
		local function setVolume(sound)
			local _result = sound
			if _result ~= nil then
				_result = _result:IsA("Sound")
			end
			if _result then
				local _exp = settings.Audio
				local _value = sound:GetAttribute("Music")
				sound.Volume *= (_exp[if _value ~= 0 and (_value == _value and (_value ~= "" and _value)) then "Music" else "Effects"] / 100) + .5
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
})
return VolumeController
