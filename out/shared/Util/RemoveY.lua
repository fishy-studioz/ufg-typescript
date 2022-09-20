-- Compiled with roblox-ts v1.3.3
local function RemoveY(vec)
	return Vector3.new(vec.X, 0, vec.Z)
end
return {
	default = RemoveY,
}
