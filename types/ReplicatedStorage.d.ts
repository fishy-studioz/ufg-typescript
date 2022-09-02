interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		Animations: Folder & {
			Main: Folder & {
				Dash: Animation;
			};
		};
		VFX: Configuration & {
			Explosion: Part & {
				Explosion: Attachment & {
					["Sparks (30)"]: ParticleEmitter;
					["BrightWave (5)"]: ParticleEmitter;
					["DarkWave (5)"]: ParticleEmitter;
				};
			};
		};
		Stat: TextLabel & {
			Value: TextLabel & {
				UIStroke: UIStroke;
			};
			UIStroke: UIStroke;
			Icon: ImageLabel & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
		};
	};
	Network: Folder & {
		Notif: RemoteEvent;
		PlayerIsInUI: RemoteFunction;
		SendConsoleMsg: RemoteEvent;
		Ping: RemoteFunction;
	};
	TypeScript: Folder & {
		Logger: ModuleScript;
		Util: Folder & {
			Tween: ModuleScript;
			Spring: ModuleScript;
			GetScaledUDim: ModuleScript;
			FindAncestor: ModuleScript;
			Tweenable: ModuleScript;
			Weld: ModuleScript;
			ClickPop: ModuleScript;
			Limit: ModuleScript;
			WaitFor: ModuleScript;
			Find: ModuleScript;
			RemoveY: ModuleScript;
			NegativeLimit: ModuleScript;
			Teleport: ModuleScript;
			RandomElement: ModuleScript;
			StrictMap: ModuleScript;
			IsNaN: ModuleScript;
			Pair: ModuleScript;
			AnimatedButton: ModuleScript;
			FormatInt: ModuleScript;
			Spacify: ModuleScript;
			HoverPop: ModuleScript;
			Timer: ModuleScript;
			StringBuilder: ModuleScript;
			HoverColor: ModuleScript;
			GetTweenPos: ModuleScript;
		};
		Classes: Folder & {
			CharAccessory: ModuleScript;
			Character: ModuleScript;
		};
	};
	Lua: Folder & {
		SharedModules: Folder & {
			EventManager: ModuleScript;
			Log: ModuleScript;
			ModuleHandler: ModuleScript;
			Events: Folder;
		};
		ClientModules: Folder & {
			Libraries: Folder & {
				UIFX: ModuleScript;
			};
			Utility: Folder & {
				SandboxedEvent: ModuleScript;
				UIAnimator: ModuleScript;
				Queue: ModuleScript;
				Utility: ModuleScript;
			};
		};
	};
	TypeScript_Include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["string-utils"]: ModuleScript;
			datastore2: Folder & {
				src: ModuleScript & {
					IsPlayer: ModuleScript;
					Verifier: ModuleScript;
					DataStoreServiceRetriever: ModuleScript;
					SavingMethods: ModuleScript & {
						OrderedBackups: ModuleScript;
						Standard: ModuleScript;
					};
					Promise: ModuleScript;
					Settings: ModuleScript;
					TableUtil: ModuleScript;
					Constants: ModuleScript;
				};
			};
			services: ModuleScript;
			knit: Folder & {
				Knit: ModuleScript & {
					KnitServer: ModuleScript;
					Version: StringValue;
					Util: Folder & {
						Promise: ModuleScript;
						Streamable: ModuleScript;
						Option: ModuleScript;
						Ser: ModuleScript;
						Remote: Folder & {
							RemoteProperty: ModuleScript;
							RemoteSignal: ModuleScript;
							ClientRemoteProperty: ModuleScript;
							ClientRemoteSignal: ModuleScript;
						};
						Timer: ModuleScript;
						Component: ModuleScript;
						StreamableUtil: ModuleScript;
						EnumList: ModuleScript;
						Loader: ModuleScript;
						Janitor: ModuleScript;
						Symbol: ModuleScript;
						TableUtil: ModuleScript;
						Signal: ModuleScript;
					};
					KnitClient: ModuleScript;
				};
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
		};
	};
}
