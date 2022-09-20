export default function GetTweenPos(instance: Instance): { Open: UDim2, Closed: UDim2 } {
    return {
        Open: <UDim2>instance.GetAttribute("OpenPos"),
        Closed: <UDim2>instance.GetAttribute("ClosedPos")
    }
}