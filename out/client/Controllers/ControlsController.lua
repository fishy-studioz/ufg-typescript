-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local ControlsController = Knit.CreateController({
	Name = "ControlsController",
	Update = function(self, settings) end,
})
return ControlsController
