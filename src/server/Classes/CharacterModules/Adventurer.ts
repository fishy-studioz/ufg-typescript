import { Character, CharacterStats, Element, Stars, WeaponType } from "shared/Classes/Character";

export = new Character(
    script.Name, //char name
    WeaponType.Sword, //type of weapon they use
    Element.Aero,  //element of character
    Stars.Five,  //rarity of character
    false,  //obtainable from wishing
    { //abilities
        Skill: {
            Name: "elemental skill name",
            Icon: ""
        },
        Burst: {
            Name: "elemental burst name",
            Icon: ""
        },
    },
    { //default state
        Stats: new CharacterStats(1200, 100, 20), //base health, attack, and resist
        Equipped: {
            Weapon: "Default Sword",
            Accessories: {
                Head: undefined,
                Body: undefined,
                Feet: undefined,
            }
        }
    })