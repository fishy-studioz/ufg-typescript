-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Lighting = _services.Lighting
local World = _services.Workspace
local camera = World.CurrentCamera
local GraphicsController = Knit.CreateController({
	Name = "GraphicsController",
	Update = function(self, _param)
		local graphics = _param.Graphics
		camera.FieldOfView = graphics.FOV
		Lighting.Brightness = graphics.Brightness / 100
		Lighting.GlobalShadows = graphics.Shadows
		Lighting.EnvironmentSpecularScale = if graphics.PBR then Lighting.EnvironmentSpecularScale else 0
		-- Lighting.EnvironmentDiffuseScale = graphics.PBR ? Lighting.EnvironmentDiffuseScale : 0
		for _, i in ipairs(Lighting:GetChildren()) do
			if i:IsA("PostEffect") then
				i.Enabled = graphics.PostProcessing
			end
		end
	end,
})
return GraphicsController
