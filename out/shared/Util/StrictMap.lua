-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local StrictMap
do
	StrictMap = setmetatable({}, {
		__tostring = function()
			return "StrictMap"
		end,
	})
	StrictMap.__index = StrictMap
	function StrictMap.new(...)
		local self = setmetatable({}, StrictMap)
		return self:constructor(...) or self
	end
	function StrictMap:constructor(base)
		if base == nil then
			base = {}
		end
		local _map = {}
		for _, _v in ipairs(base) do
			_map[_v[1]] = _v[2]
		end
		self.cache = _map
	end
	function StrictMap:Size()
		-- ▼ ReadonlyMap.size ▼
		local _size = 0
		for _ in pairs(self.cache) do
			_size += 1
		end
		-- ▲ ReadonlyMap.size ▲
		return _size
	end
	function StrictMap:Delete(key)
		-- ▼ Map.delete ▼
		local _valueExisted = self.cache[key] ~= nil
		self.cache[key] = nil
		-- ▲ Map.delete ▲
		return _valueExisted
	end
	function StrictMap:Set(key, value)
		self.cache[key] = value
		return self
	end
	function StrictMap:Get(key)
		local value = self.cache[key]
		if not (value ~= 0 and (value == value and (value ~= "" and value))) then
			error(Logger:UtilError("StrictMap.Get", 'Key "' .. (tostring(key) .. '" has no value associated with it.')))
		else
			return value
		end
	end
	function StrictMap:ForEach(callback)
		local _exp = self.cache
		for _k, _v in pairs(_exp) do
			callback(_v, _k, _exp)
		end
	end
end
return {
	default = StrictMap,
}
