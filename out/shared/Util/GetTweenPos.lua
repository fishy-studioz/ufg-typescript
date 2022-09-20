-- Compiled with roblox-ts v1.3.3
local function GetTweenPos(instance)
	return {
		Open = instance:GetAttribute("OpenPos"),
		Closed = instance:GetAttribute("ClosedPos"),
	}
end
return {
	default = GetTweenPos,
}
