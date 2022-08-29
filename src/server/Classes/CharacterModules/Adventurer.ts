import { Character, CharacterStats, Element, Gender, Stars, WeaponType } from "shared/Classes/Character";

export = new Character(
    script.Name, //char name
    WeaponType.Sword, //type of weapon they use
    Element.Aero,  //element of character
    Stars.Five,  //rarity of character
    Gender.Male, //changeable since adventurer?????
    false,  //obtainable from wishing
    {
        Profile: 123456,
        Bust: 123456,
        Skill: 123456,
        Burst: 123456,
    },
    {
        Burst: {
            Name: "burst name",
            Cooldown: 35,
            BaseDamage: 350,
        },
        Skill: {
            Name: "skill name",
            Cooldown: 12,
            BaseDamage: 100
        }
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
    });