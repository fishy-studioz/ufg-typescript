-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Limit = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Limit").default
local function NegativeLimit(n, limit)
	return Limit(n, -limit, limit)
end
return {
	default = NegativeLimit,
}
