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

export interface CharacterImages {
    readonly Profile: number;
    readonly Bust: number;
    readonly Skill: number;
    readonly Burst: number;
}

export interface CharacterAbilityInfo {
    readonly Burst: {
        readonly Name: string;
        readonly Cooldown: number;
        readonly BaseDamage: number;
    };
    readonly Skill: {
        readonly Name: string;
        readonly Cooldown: number;
        readonly BaseDamage: number;
    };
}

export interface AbilityMultipliers { 
    Damage: number;
    Cooldown: number;
}

export enum Gender {
    Male,
    Female,
    Other
}

export class Character {
    public constructor(
        public readonly Name: string,
        public readonly WeaponType: WeaponType,
        public readonly Element: Element,
        public readonly Rarity: Stars,
        public readonly Gender: Gender,
        public readonly Wishable: boolean,
        public readonly Images: CharacterImages,
        public readonly AbilityInfo: CharacterAbilityInfo,
        
        public State: CharacterState
    ) {
        this.AbilityMultipliers = {
            Damage: 1,
            Cooldown: 1
        }
    }

    public AbilityMultipliers: AbilityMultipliers
}