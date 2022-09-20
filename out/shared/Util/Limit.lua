-- Compiled with roblox-ts v1.3.3
local function Limit(n, min, max)
	return if n < min then min else (if n > max then max else n)
end
return {
	default = Limit,
}
