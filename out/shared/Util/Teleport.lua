-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local Find = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Find").default
local function Teleport(cf)
	local torso = Find(Player.Character, "UpperTorso")
	local _exp = (cf or torso.CFrame)
	local _vector3 = Vector3.new(0, 6, 0)
	torso.CFrame = _exp + _vector3
end
return {
	default = Teleport,
}
