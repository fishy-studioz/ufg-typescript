interface PlayerGui extends Instance {
	TestMode: BoolValue;
	MenuCamPart: Part;
	Version: ScreenGui & {
		UIPadding: UIPadding;
		Label: TextLabel & {
			DisplayVersion: ModuleScript;
			UIStroke: UIStroke;
		};
	};
	UI: ScreenGui & {
		MainGame: Frame & {
			Wish: Frame;
			NicknamePrompt: Frame & {
				AssignNickname: ModuleScript;
				EquippedSlot: IntValue;
				TextBox: TextBox & {
					UICorner: UICorner;
					UIStroke: UIStroke;
					UIPadding: UIPadding;
				};
				UIStroke: UIStroke;
				UICorner: UICorner;
				Title: TextLabel & {
					UIStroke: UIStroke;
				};
			};
			Characters: Frame & {
				OpenCharacters: ModuleScript;
				SelectedChar: StringValue;
				TopBar: Frame & {
					CharacterList: ScrollingFrame & {
						CharacterIcon: ImageButton & {
							UICorner: UICorner;
							UIStroke: UIStroke;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
						};
						UIPadding: UIPadding;
						UIListLayout: UIListLayout;
					};
					UIPadding: UIPadding;
				};
				Underlay: Frame & {
					Layout: Frame & {
						LevelInfo: Frame & {
							CharLevel: TextLabel & {
								UpdateCharLevel: ModuleScript;
								UIStroke: UIStroke;
							};
							MaxLevel: TextLabel & {
								UIStroke: UIStroke;
							};
							LevelUp: TextButton & {
								UICorner: UICorner;
								UIStroke: UIStroke;
								LevelUpBtnAnims: ModuleScript;
							};
						};
						Buttons: Frame & {
							Profile: TextButton & {
								UIStroke: UIStroke;
								Notification: Frame & {
									UICorner: UICorner;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									Amount: TextLabel;
								};
								Diamond: ImageLabel & {
									UICorner: UICorner;
									Shadow: ImageLabel & {
										UICorner: UICorner;
									};
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
							Accessories: TextButton & {
								UIStroke: UIStroke;
								Notification: Frame & {
									UICorner: UICorner;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									Amount: TextLabel;
								};
								Diamond: ImageLabel & {
									UICorner: UICorner;
									Shadow: ImageLabel & {
										UICorner: UICorner;
									};
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
							CharActionBtnAnims: ModuleScript;
							UIListLayout: UIListLayout;
							Weapons: TextButton & {
								UIStroke: UIStroke;
								Notification: Frame & {
									UICorner: UICorner;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									Amount: TextLabel;
								};
								Diamond: ImageLabel & {
									UICorner: UICorner;
									Shadow: ImageLabel & {
										UICorner: UICorner;
									};
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
							Evolution: TextButton & {
								UIStroke: UIStroke;
								Notification: Frame & {
									UICorner: UICorner;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									Amount: TextLabel;
								};
								Diamond: ImageLabel & {
									UICorner: UICorner;
									Shadow: ImageLabel & {
										UICorner: UICorner;
									};
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
							Attributes: TextButton & {
								UIStroke: UIStroke;
								Notification: Frame & {
									UICorner: UICorner;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									Amount: TextLabel;
								};
								Diamond: ImageLabel & {
									UICorner: UICorner;
									Shadow: ImageLabel & {
										UICorner: UICorner;
									};
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
						};
					};
					Attributes: Frame & {
						CharName: TextLabel & {
							UIStroke: UIStroke;
						};
						List: Frame & {
							UIListLayout: UIListLayout;
							UIPadding: UIPadding;
						};
					};
					UIPadding: UIPadding;
				};
			};
			ConsoleMessageListener: ModuleScript;
			PartySetup: Frame;
			HUD: Frame & {
				CharState: Frame & {
					UIPadding: UIPadding;
					Level: TextLabel & {
						UpdateLevelText: ModuleScript;
						UIStroke: UIStroke;
					};
					Icon: ImageLabel & {
						CharIconUpdater: ModuleScript;
						Prestige: Frame & {
							UICorner: UICorner;
							UIStroke: UIStroke;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							Value: TextLabel & {
								UIStroke: UIStroke;
							};
						};
						UICorner: UICorner;
						UIAspectRatioConstraint: UIAspectRatioConstraint;
						Border: ImageLabel;
					};
					Health: Frame & {
						UIGradient: UIGradient;
						HealthStateUpdater: ModuleScript;
						UICorner: UICorner;
						UIStroke: UIStroke;
						TextLabel: TextLabel & {
							UIStroke: UIStroke;
						};
						Bar: Frame & {
							UIGradient: UIGradient;
							UICorner: UICorner;
						};
					};
				};
				Party: Frame & {
					UpdatePartyHUD: ModuleScript;
					Two: Frame & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIPadding: UIPadding;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Health: Frame & {
							UICorner: UICorner;
							UIGradient: UIGradient;
							Bar: Frame & {
								UIGradient: UIGradient;
								UICorner: UICorner;
							};
						};
						CharName: TextLabel & {
							UIPadding: UIPadding;
							UIStroke: UIStroke;
						};
						Icon: ImageLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UICorner: UICorner;
						};
						SelectedBackground: ImageLabel;
					};
					One: Frame & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIPadding: UIPadding;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Health: Frame & {
							UICorner: UICorner;
							UIGradient: UIGradient;
							Bar: Frame & {
								UIGradient: UIGradient;
								UICorner: UICorner;
							};
						};
						CharName: TextLabel & {
							UIPadding: UIPadding;
							UIStroke: UIStroke;
						};
						Icon: ImageLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UICorner: UICorner;
						};
						SelectedBackground: ImageLabel;
					};
					Four: Frame & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIPadding: UIPadding;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Health: Frame & {
							UICorner: UICorner;
							UIGradient: UIGradient;
							Bar: Frame & {
								UIGradient: UIGradient;
								UICorner: UICorner;
							};
						};
						CharName: TextLabel & {
							UIPadding: UIPadding;
							UIStroke: UIStroke;
						};
						Icon: ImageLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UICorner: UICorner;
						};
						SelectedBackground: ImageLabel;
					};
					UIListLayout: UIListLayout;
					Three: Frame & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIPadding: UIPadding;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Health: Frame & {
							UICorner: UICorner;
							UIGradient: UIGradient;
							Bar: Frame & {
								UIGradient: UIGradient;
								UICorner: UICorner;
							};
						};
						CharName: TextLabel & {
							UIPadding: UIPadding;
							UIStroke: UIStroke;
						};
						Icon: ImageLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UICorner: UICorner;
						};
						SelectedBackground: ImageLabel;
					};
				};
				Abilities: Frame & {
					Gadget: ImageButton & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Icon: ImageLabel;
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					Burst: ImageButton & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Icon: ImageLabel;
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					AbilityKeyPressAnims: ModuleScript;
					UIPadding: UIPadding;
					Skill: ImageButton & {
						KeyName: TextLabel & {
							UICorner: UICorner;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIScale: UIScale;
						};
						Icon: ImageLabel;
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					UpdateAbilities: ModuleScript;
				};
				ConnectionStatus: Frame & {
					Ping: TextLabel;
					UIPadding: UIPadding;
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					UICorner: UICorner;
					UIStroke: UIStroke;
					Icon: ImageLabel & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					DisplayPing: ModuleScript;
				};
				LocationName: TextLabel & {
					UIStroke: UIStroke;
					Line: ImageLabel;
					DisplayLocation: ModuleScript;
				};
				Menu: Frame & {
					ButtonList: Frame & {
						Inventory: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						UIPadding: UIPadding;
						Characters: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						Shop: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						Achievements: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						UIGridLayout: UIGridLayout;
						Events: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						Handbook: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						Wish: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						AdventureMenuBtnAnims: ModuleScript;
						PartySetup: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
						BattlePass: ImageButton & {
							UIPadding: UIPadding;
							Title: TextLabel;
							Icon: ImageLabel;
						};
					};
					OpenMenu: ModuleScript;
					UIStroke: UIStroke;
					Sidebar: Frame & {
						Buttons: Frame & {
							UIPadding: UIPadding;
							UIListLayout: UIListLayout;
						};
					};
					PlayerCard: ImageLabel;
				};
			};
		};
		MainMenu: Frame & {
			Tip: TextLabel & {
				Gradient: ImageLabel;
			};
			UIPadding: UIPadding;
			Buttons: Frame & {
				Exit: TextButton & {
					Title: TextLabel & {
						UIStroke: UIStroke;
					};
					UICorner: UICorner;
					UIStroke: UIStroke;
					Icon: ImageLabel;
					UIAspectRatioConstraint: UIAspectRatioConstraint;
				};
				UIPadding: UIPadding;
				UIListLayout: UIListLayout;
				News: TextButton & {
					Title: TextLabel & {
						UIStroke: UIStroke;
					};
					UICorner: UICorner;
					UIStroke: UIStroke;
					Icon: ImageLabel;
					UIAspectRatioConstraint: UIAspectRatioConstraint;
				};
				MainMenuBtnAnims: ModuleScript;
				Options: TextButton & {
					Title: TextLabel & {
						UIStroke: UIStroke;
					};
					UICorner: UICorner;
					UIStroke: UIStroke;
					Icon: ImageLabel;
					UIAspectRatioConstraint: UIAspectRatioConstraint;
				};
			};
			Start: ImageLabel & {
				Line: ImageLabel;
				Tip: TextLabel;
				Title: TextLabel;
				MenuAdvance: ModuleScript;
			};
			TestingSkip: ModuleScript;
		};
	};
	ServerNotif: ScreenGui & {
		UIPadding: UIPadding;
		Frame: Frame & {
			Message: TextLabel & {
				UIStroke: UIStroke;
			};
			Title: TextLabel & {
				UIStroke: UIStroke;
			};
			UIPadding: UIPadding;
			Close: TextButton & {
				UICorner: UICorner;
			};
			UICorner: UICorner;
			AnnouncerIcon: ImageLabel & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				UICorner: UICorner;
			};
			NotificationListener: ModuleScript;
			UIStroke: UIStroke;
		};
	};
	FX: ScreenGui & {
		Black: Frame;
	};
	UIScript: LocalScript;
}
