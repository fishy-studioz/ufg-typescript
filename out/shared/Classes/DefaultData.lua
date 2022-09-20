-- Compiled with roblox-ts v1.3.3
local DefaultData = {
	CareerKills = 0,
	Tritocoins = 0,
	Settings = {
		Volume = {
			Master = 100,
			Effects = 100,
			Music = 100,
		},
		Controls = {
			LookSensitivity = 5,
			AimSensitivity = 5,
			ToggleCrouch = false,
			ToggleSprint = false,
			Keybinds = {
				Crouch = "C",
				Tactical = "Q",
				Ultimate = "F",
				Interact = "E",
				Taunt = "G",
				Jump = "Space",
			},
		},
		Graphics = {
			Shadows = true,
			PBR = true,
			BulletImpacts = true,
			PostProcessing = true,
			MotionBlur = true,
			Brightness = 100,
			FOV = 70,
		},
	},
}
return {
	DefaultData = DefaultData,
}
