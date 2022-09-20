-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local modules = (script.Parent:FindFirstChild("Services")):GetDescendants()
for _, module in ipairs(modules) do
	if module:IsA("ModuleScript") then
		require(module)
	end
end
Knit.Start():catch(function(e)
	return Logger:KnitError(e)
end)
