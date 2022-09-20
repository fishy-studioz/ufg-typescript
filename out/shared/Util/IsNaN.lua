-- Compiled with roblox-ts v1.3.3
local function IsNaN(value)
	if typeof(value) ~= "number" then
		return true
	end
	return value ~= value
end
return {
	default = IsNaN,
}
