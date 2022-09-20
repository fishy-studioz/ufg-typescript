-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local Logger
do
	Logger = setmetatable({}, {
		__tostring = function()
			return "Logger"
		end,
	})
	Logger.__index = Logger
	function Logger.new(...)
		local self = setmetatable({}, Logger)
		return self:constructor(...) or self
	end
	function Logger:constructor()
	end
	function Logger:Log(source, msg, fatal, warning)
		if fatal == nil then
			fatal = false
		end
		if warning == nil then
			warning = false
		end
		if fatal then
			error(error("[" .. (source .. ("]:   ➤ " .. tostring(msg)))))
		elseif warning then
			warn("[" .. (source .. ("]:   ➤ " .. tostring(msg))))
		else
			print("[" .. (source .. ("]:   ➤ " .. tostring(msg))))
		end
	end
	function Logger:ComponentActive(name)
		self:Log("Info", name .. " active")
	end
	function Logger:Debug(...)
		local info = { ... }
		if RunService:IsStudio() then
			local _fn = self
			local _arg0 = function(v)
				local _condition = v
				if _condition == nil then
					_condition = "nil"
				end
				return _condition
			end
			-- ▼ ReadonlyArray.map ▼
			local _newValue = table.create(#info)
			for _k, _v in ipairs(info) do
				_newValue[_k] = _arg0(_v, _k - 1, info)
			end
			-- ▲ ReadonlyArray.map ▲
			-- ▼ ReadonlyArray.join ▼
			local _result = table.create(#_newValue)
			for _k, _v in ipairs(_newValue) do
				_result[_k] = tostring(_v)
			end
			-- ▲ ReadonlyArray.join ▲
			_fn:Log("Debug", table.concat(_result, "   "))
		end
	end
	function Logger:UnhandledCase(msg)
		self:Log("Unhandled Case", msg, true)
	end
	function Logger:HttpError(msg)
		self:Log("HTTP Error", msg, false, true)
	end
	function Logger:UtilError(methodName, msg)
		self:Log("Util Error : " .. (methodName .. "()"), msg, true)
	end
	function Logger:KnitError(msg)
		self:Log("Knit Error", msg, true)
	end
end
return {
	default = Logger,
}
