-- Compiled with roblox-ts v1.3.3
local function Weld(p0, p1, constraint)
	if constraint == nil then
		constraint = true
	end
	local w = Instance.new(if constraint then "WeldConstraint" else "Weld")
	w.Part0 = p0
	w.Part1 = p1
	w.Parent = p0
	return if constraint then w else w
end
return {
	default = Weld,
}
