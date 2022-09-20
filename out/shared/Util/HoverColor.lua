-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Tween = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "Tween").Tween
local HoverColorOn, HoverColorTextOn, HoverColorOff, HoverColorTextOff
local function HoverColor(button, color, defaultColor, spd)
	button.MouseEnter:Connect(function()
		return if button:IsA("ImageButton") then HoverColorOn(button, color, spd) else HoverColorTextOn(button, color, spd)
	end)
	button.MouseLeave:Connect(function()
		return if button:IsA("ImageButton") then HoverColorOff(button, defaultColor, spd) else HoverColorTextOff(button, defaultColor, spd)
	end)
end
function HoverColorOn(button, color, spd)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	return Tween(button, info, {
		ImageColor3 = color,
	})
end
function HoverColorOff(button, defaultColor, spd)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	return Tween(button, info, {
		ImageColor3 = defaultColor,
	})
end
function HoverColorTextOn(button, color, spd)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	return Tween(button, info, {
		BackgroundColor3 = color,
	})
end
function HoverColorTextOff(button, defaultColor, spd)
	local info = TweenInfo.new(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
	return Tween(button, info, {
		BackgroundColor3 = defaultColor,
	})
end
return {
	HoverColor = HoverColor,
	HoverColorOn = HoverColorOn,
	HoverColorOff = HoverColorOff,
	HoverColorTextOn = HoverColorTextOn,
	HoverColorTextOff = HoverColorTextOff,
}
