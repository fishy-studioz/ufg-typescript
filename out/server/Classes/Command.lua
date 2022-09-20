-- Compiled with roblox-ts v1.3.3
local Command
do
	Command = setmetatable({}, {
		__tostring = function()
			return "Command"
		end,
	})
	Command.__index = Command
	function Command.new(...)
		local self = setmetatable({}, Command)
		return self:constructor(...) or self
	end
	function Command:constructor(Name, PermissionLevel, Aliases, callback)
		self.Name = Name
		self.PermissionLevel = PermissionLevel
		self.Aliases = Aliases
		self.callback = callback
	end
	function Command:Run(plr, args)
		self.callback(plr, args)
	end
end
return {
	Command = Command,
}
