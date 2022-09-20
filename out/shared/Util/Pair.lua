-- Compiled with roblox-ts v1.3.3
local Pair
do
	Pair = setmetatable({}, {
		__tostring = function()
			return "Pair"
		end,
	})
	Pair.__index = Pair
	function Pair.new(...)
		local self = setmetatable({}, Pair)
		return self:constructor(...) or self
	end
	function Pair:constructor(First, Second)
		self.First = First
		self.Second = Second
	end
end
local TypedPair
do
	TypedPair = setmetatable({}, {
		__tostring = function()
			return "TypedPair"
		end,
	})
	TypedPair.__index = TypedPair
	function TypedPair.new(...)
		local self = setmetatable({}, TypedPair)
		return self:constructor(...) or self
	end
	function TypedPair:constructor(First, Second)
		self.First = First
		self.Second = Second
	end
end
return {
	Pair = Pair,
	TypedPair = TypedPair,
}
