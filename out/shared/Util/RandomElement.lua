-- Compiled with roblox-ts v1.3.3
local function RandomElement(arr)
	return arr[math.random(#arr) - 1 + 1]
end
return {
	default = RandomElement,
}
