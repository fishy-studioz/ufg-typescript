import { Player } from "@rbxts/knit/Knit/KnitClient";
import Find from "./Find";

export default function Teleport(cf: CFrame | undefined) {
    const torso = Find<BasePart>(Player.Character!, "UpperTorso")!;
    torso.CFrame = (cf ?? torso.CFrame).add(new Vector3(0, 6, 0));
}