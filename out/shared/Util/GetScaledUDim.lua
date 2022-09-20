-- Compiled with roblox-ts v1.3.3
local function GetScaledUDim(button, offsetUDim)
	local screenUI = button:FindFirstAncestorOfClass("ScreenGui")
	local screenSize = screenUI.AbsoluteSize
	local scaleX = offsetUDim.X.Offset / screenSize.X
	local scaleY = offsetUDim.Y.Offset / screenSize.Y
	return UDim2.new(scaleX, 0, scaleY, 0)
end
return {
	GetScaledUDim = GetScaledUDim,
}
