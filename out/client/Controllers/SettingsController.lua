-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local SettingsController = Knit.CreateController({
	Name = "SettingsController",
	KnitStart = function(self)
		local settings = Knit.GetService("SettingsService")
		local graphics = Knit.GetController("GraphicsController")
		local volume = Knit.GetController("VolumeController")
		settings.Updated:Connect(function(data)
			graphics:Update(data)
			volume:Update(data)
		end)
		Logger:ComponentActive(script.Name)
		Logger:ComponentActive("GraphicsController")
		Logger:ComponentActive("ControlsController")
		Logger:ComponentActive("VolumeController")
	end,
})
return SettingsController
