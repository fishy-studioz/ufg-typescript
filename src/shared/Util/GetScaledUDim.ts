export function GetScaledUDim(button: GuiButton, offsetUDim: UDim2): UDim2 {
    const screenUI = button.FindFirstAncestorOfClass<keyof Instances>("ScreenGui") as ScreenGui;
    const screenSize: Vector2 = screenUI.AbsoluteSize;
    const scaleX = offsetUDim.X.Offset / screenSize.X;
    const scaleY = offsetUDim.Y.Offset / screenSize.Y;
    return new UDim2(scaleX, 0, scaleY, 0);
}