-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local function Find(instance, instanceName)
	if not instance then
		Logger:UtilError("Find", "Instance is undefined")
	end
	if not (instanceName ~= "" and instanceName) then
		Logger:UtilError("Find", "Instance name undefined")
	end
	return instance:FindFirstChild(instanceName, true)
end
return {
	default = Find,
}
