-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local SettingsController = Knit.CreateController({
	Name = "SettingsController",
	KnitInit = function(self) end,
	KnitStart = function(self)
		Logger:ComponentActive(script.Name)
	end,
})
return SettingsController
