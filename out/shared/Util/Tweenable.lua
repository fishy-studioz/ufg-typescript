-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local TweenService = TS.import(script, TS.getModule(script, "@rbxts", "services")).TweenService
local Tweenable
do
	Tweenable = setmetatable({}, {
		__tostring = function()
			return "Tweenable"
		end,
	})
	Tweenable.__index = Tweenable
	function Tweenable.new(...)
		local self = setmetatable({}, Tweenable)
		return self:constructor(...) or self
	end
	function Tweenable:constructor(Instance, Time, Style, DelayTime)
		if Style == nil then
			Style = Enum.EasingStyle.Linear
		end
		if DelayTime == nil then
			DelayTime = 0
		end
		self.Instance = Instance
		self.Time = Time
		self.Style = Style
		self.DelayTime = DelayTime
	end
	function Tweenable:AssertProperties()
		local _time = self.Time
		assert(_time ~= 0 and (_time == _time and _time), "Cannot tween without a time property")
		local _style = self.Style
		assert(_style, "Cannot tween without an easing style property")
	end
	function Tweenable:Tween(goal)
		self:AssertProperties()
		local info = TweenInfo.new(self.Time, self.Style, Enum.EasingDirection.In, 0, false, self.DelayTime)
		return self:TweenCustom(info, goal)
	end
	function Tweenable:TweenIn(goal)
		return self:Tween(goal)
	end
	function Tweenable:TweenOut(goal)
		self:AssertProperties()
		local info = TweenInfo.new(self.Time, self.Style, Enum.EasingDirection.Out, 0, false, self.DelayTime)
		return self:TweenCustom(info, goal)
	end
	function Tweenable:TweenInOut(goal)
		self:AssertProperties()
		local info = TweenInfo.new(self.Time, self.Style, Enum.EasingDirection.InOut, 0, false, self.DelayTime)
		return self:TweenCustom(info, goal)
	end
	function Tweenable:TweenCustom(info, goal)
		local t = TweenService:Create(self.Instance, info, goal)
		t:Play()
		return t
	end
end
return {
	default = Tweenable,
}
