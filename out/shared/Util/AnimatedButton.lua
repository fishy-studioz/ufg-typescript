-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local _ClickPop = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "ClickPop")
local ClickPop = _ClickPop.ClickPop
local ClickPopUp = _ClickPop.ClickPopUp
local ClickPopDown = _ClickPop.ClickPopDown
local HoverColor = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "HoverColor").HoverColor
local _HoverPop = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "HoverPop")
local HoverPop = _HoverPop.HoverPop
local HoverPopDown = _HoverPop.HoverPopDown
local HoverPopUp = _HoverPop.HoverPopUp
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Tweenable").default
local AnimatedButton
do
	local super = Tweenable
	AnimatedButton = setmetatable({}, {
		__tostring = function()
			return "AnimatedButton"
		end,
		__index = super,
	})
	AnimatedButton.__index = AnimatedButton
	function AnimatedButton.new(...)
		local self = setmetatable({}, AnimatedButton)
		return self:constructor(...) or self
	end
	function AnimatedButton:constructor(button, spd)
		super.constructor(self, button, spd)
	end
	function AnimatedButton:ClickPop(pop, spd)
		ClickPop(self.Instance, pop, spd)
		return self
	end
	function AnimatedButton:ClickPopOn(pop, spd, defaultGoal)
		return ClickPopDown(self.Instance, pop, spd, defaultGoal)
	end
	function AnimatedButton:ClickPopOff(pop, spd, defaultGoal)
		return ClickPopUp(self.Instance, pop, spd, defaultGoal)
	end
	function AnimatedButton:HoverColor(color, defaultColor, spd)
		HoverColor(self.Instance, color, defaultColor, spd)
		return self
	end
	function AnimatedButton:HoverPop(pop, spd)
		HoverPop(self.Instance, pop, spd)
		return self
	end
	function AnimatedButton:HoverPopOn(pop, spd, defaultGoal)
		return HoverPopUp(self.Instance, pop, spd, defaultGoal)
	end
	function AnimatedButton:HoverPopOff(spd, defaultGoal)
		return HoverPopDown(self.Instance, spd, defaultGoal)
	end
end
return {
	default = AnimatedButton,
}
