-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Pair = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Pair").Pair
local GetScaledUDim = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "GetScaledUDim").GetScaledUDim
local Tween = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Tween").Tween
local ClickPopDown, ClickPopUp
local function ClickPop(button, pop, spd)
	local defaultGoal = {
		Size = button.Size,
		Position = button.Position,
	}
	button.MouseButton1Down:Connect(function()
		return ClickPopDown(button, pop, spd, defaultGoal)
	end)
	button.MouseButton1Up:Connect(function()
		return ClickPopUp(button, pop, spd, defaultGoal)
	end)
end
function ClickPopUp(button, pop, spd, defaultGoal)
	local info = TweenInfo.new(spd / 2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	local function GetPop()
		local popUDim = UDim2.new(0, -pop, 0, -pop)
		local scaleUDim = GetScaledUDim(button, popUDim)
		local popScale = UDim2.new(scaleUDim.X.Scale / 2, 0, scaleUDim.Y.Scale / 2, 0)
		return Pair.new(popUDim, popScale)
	end
	local scalePair = GetPop()
	local popUDim = scalePair.First
	local popScale = scalePair.Second
	local _object = {}
	local _left = "Size"
	local _result = defaultGoal.Size
	if _result ~= nil then
		_result = _result - popUDim
	end
	_object[_left] = _result
	local _left_1 = "Position"
	local _result_1 = defaultGoal.Position
	if _result_1 ~= nil then
		_result_1 = _result_1 + popScale
	end
	_object[_left_1] = _result_1
	return Tween(button, info, _object)
end
function ClickPopDown(button, pop, spd, defaultGoal)
	local info = TweenInfo.new(spd / 2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	local function GetPop()
		local popUDim = UDim2.new(0, -pop, 0, -pop)
		local scaleUDim = GetScaledUDim(button, popUDim)
		local popScale = UDim2.new(scaleUDim.X.Scale / 2, 0, scaleUDim.Y.Scale / 2, 0)
		return Pair.new(popUDim, popScale)
	end
	local scalePair = GetPop()
	local popUDim = scalePair.First
	local popScale = scalePair.Second
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
return {
	ClickPop = ClickPop,
	ClickPopUp = ClickPopUp,
	ClickPopDown = ClickPopDown,
}
