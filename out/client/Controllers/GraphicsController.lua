-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Lighting = TS.import(script, TS.getModule(script, "@rbxts", "services")).Lighting
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local GraphicsController = Knit.CreateController({
	Name = "GraphicsController",
	Update = function(self, _param)
		local graphics = _param.Graphics
		Lighting.GlobalShadows = graphics.Shadows
		for _, i in ipairs(Lighting:GetChildren()) do
			if i:IsA("PostEffect") then
				i.Enabled = graphics.PostProcessing
			end
		end
		Lighting.EnvironmentSpecularScale = if graphics.PBR then Lighting.EnvironmentSpecularScale else 0
		Lighting.EnvironmentDiffuseScale = if graphics.PBR then Lighting.EnvironmentDiffuseScale else 0
	end,
	Toggle = function(self, toggleableSetting)
		local settings = Knit.GetService("SettingsService")
		local settingsData = settings:Get()
		if settingsData then
			local currentValue = settingsData.Graphics[toggleableSetting]
			if type(currentValue) == "boolean" then
				settingsData.Graphics[toggleableSetting] = not currentValue
				settings:Set(settingsData)
				return settingsData.Graphics[toggleableSetting]
			else
				warn("attempt to toggle graphics setting that isnt a boolean")
			end
		end
	end,
	KnitStart = function(self)
		Logger:ComponentActive(script.Name)
		local settings = Knit.GetService("SettingsService")
		settings.Updated:Connect(function(opts)
			return self:Update(opts)
		end)
	end,
})
return GraphicsController
