-- Compiled with roblox-ts v1.3.3
local Permission
do
	local _inverse = {}
	Permission = setmetatable({}, {
		__index = _inverse,
	})
	Permission.Player = 0
	_inverse[0] = "Player"
	Permission.VIP = 1
	_inverse[1] = "VIP"
	Permission.Moderator = 2
	_inverse[2] = "Moderator"
	Permission.Administrator = 3
	_inverse[3] = "Administrator"
	Permission.Developer = 4
	_inverse[4] = "Developer"
	Permission.CoOwner = 5
	_inverse[5] = "CoOwner"
	Permission.Owner = 6
	_inverse[6] = "Owner"
end
return {
	Permission = Permission,
}
