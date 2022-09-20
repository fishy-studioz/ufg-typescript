-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local GetScaledUDim = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "GetScaledUDim").GetScaledUDim
local Tween = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Tween").Tween
local HoverPopUp, HoverPopDown
local function HoverPop(button, pop, spd)
	local defaultGoal = {
		Size = button.Size,
		Position = button.Position,
	}
	button.MouseEnter:Connect(function()
		return HoverPopUp(button, pop, spd, defaultGoal)
	end)
	button.MouseLeave:Connect(function()
		return HoverPopDown(button, spd, defaultGoal)
	end)
end
function HoverPopUp(button, pop, spd, defaultGoal)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	local popUDim = UDim2.new(0, pop, 0, pop)
	local scaled = GetScaledUDim(button, popUDim)
	local popScale = UDim2.new(scaled.X.Scale / 2, 0, scaled.Y.Scale / 2, 0)
	local _object = {}
	local _left = "Size"
	local _result = defaultGoal.Size
	if _result ~= nil then
		_result = _result + popUDim
	end
	_object[_left] = _result
	local _left_1 = "Position"
	local _result_1 = defaultGoal.Position
	if _result_1 ~= nil then
		_result_1 = _result_1 - popScale
	end
	_object[_left_1] = _result_1
	return Tween(button, info, _object)
end
function HoverPopDown(button, spd, defaultGoal)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	return Tween(button, info, defaultGoal)
end
return {
	HoverPop = HoverPop,
	HoverPopUp = HoverPopUp,
	HoverPopDown = HoverPopDown,
}
