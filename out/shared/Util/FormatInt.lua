-- Compiled with roblox-ts v1.3.3
-- eslint-disable no-constant-condition
local function FormatInt(x)
	local formatted = tostring(x)
	while true do
		local tuple = { string.gsub(formatted, "^(-?%d+)(%d%d%d)", "%1,%2") }
		local k = tuple[2]
		formatted = tuple[1]
		if k == 0 then
			break
		end
	end
	return formatted
end
return {
	default = FormatInt,
}
