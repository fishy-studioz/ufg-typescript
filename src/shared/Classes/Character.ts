import { CharAccessory } from "./CharAccessory";

export enum WeaponType {
    Bow,
    Sword,
    Claymore,
    Lance,
    Scepter
}

export enum Element {
    Inferno,
    Aqua,
    Frigidus,
    Electro,
    Aero,
    Terra,
    Vita
}

export enum Stars {
    Five,
    Four
}

export class CharacterStats {
    public XP = 0;
    public Health: number;
    public MaxHealth: number;
    public Attack: number;
    public Resist: number;
    public CritDmg = 100;
    public CritChance = 0;
    public Pierce = 0;
    public constructor(
        baseHealth: number,
        baseAttack: number,
        baseResist: number
    ) {
        this.Health = baseHealth
        this.MaxHealth = baseHealth
        this.Attack = baseAttack
        this.Resist = baseResist
    }
}

export interface CharacterState {
    Stats: CharacterStats;
    Equipped: {
        Weapon: string;
        Accessories: {
            Head?: CharAccessory;
            Body?: CharAccessory;
            Feet?: CharAccessory;
        };
    };
}

export interface CharacterAbilities {
    Skill: {
        Name: string;
        Icon: string;
    };
    Burst: {
        Name: string;
        Icon: string;
    }
}

export class Character {
    public constructor(
        public readonly Name: string,
        public readonly WeaponType: WeaponType,
        public readonly Element: Element,
        public readonly Rarity: Stars,
        public readonly Wishable: boolean,
        public readonly Abilities: CharacterAbilities,
        public State: CharacterState
    ) {}
}