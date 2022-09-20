-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local function WaitFor(instance, instanceName)
	if not instance then
		Logger:UtilError("WaitFor", "Instance is undefined")
	end
	if not (instanceName ~= "" and instanceName) then
		Logger:UtilError("WaitFor", "Instance name undefined")
	end
	return instance:WaitForChild(instanceName, 10)
end
return {
	default = WaitFor,
}
