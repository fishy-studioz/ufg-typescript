-- Compiled with roblox-ts v1.3.3
local function FindAncestor(instance, instanceName)
	return instance:FindFirstAncestor(instanceName)
end
return {
	default = FindAncestor,
}
