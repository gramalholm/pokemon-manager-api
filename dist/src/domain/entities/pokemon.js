"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
const pokemon_type_enum_1 = require("@domain/enums/pokemon-type.enum");
class Pokemon {
    props;
    constructor(props) {
        if (props.hp <= 0) {
            throw new Error('O HP do Pokémon deve ser maior que zero.');
        }
        let primary = props.primaryType;
        let secondary = props.secondaryType ?? null;
        if (!primary && props.type) {
            if (props.type.includes('/')) {
                const [t1, t2] = props.type.split('/');
                primary = (0, pokemon_type_enum_1.parsePokemonType)(t1);
                secondary = (0, pokemon_type_enum_1.parsePokemonType)(t2);
            }
            else {
                primary = (0, pokemon_type_enum_1.parsePokemonType)(props.type);
            }
        }
        if (!primary) {
            throw new Error('O tipo primário (primaryType) do Pokémon é obrigatório.');
        }
        if (secondary && primary === secondary) {
            throw new Error('O Pokémon não pode ter o tipo secundário idêntico ao tipo primário.');
        }
        this.props = {
            id: props.id,
            name: props.name.trim(),
            primaryType: primary,
            secondaryType: secondary,
            hp: props.hp,
            attack: props.attack ?? 50,
            defense: props.defense ?? 50,
            speed: props.speed ?? 50,
            height: props.height ?? null,
            weight: props.weight ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get primaryType() {
        return this.props.primaryType;
    }
    get secondaryType() {
        return this.props.secondaryType ?? null;
    }
    get types() {
        return this.props.secondaryType
            ? [this.props.primaryType, this.props.secondaryType]
            : [this.props.primaryType];
    }
    // Compatibilidade com contrato anterior
    get type() {
        return this.props.secondaryType
            ? `${this.props.primaryType}/${this.props.secondaryType}`
            : this.props.primaryType;
    }
    get hp() {
        return this.props.hp;
    }
    get attack() {
        return this.props.attack ?? 50;
    }
    get defense() {
        return this.props.defense ?? 50;
    }
    get speed() {
        return this.props.speed ?? 50;
    }
    get height() {
        return this.props.height ?? null;
    }
    get weight() {
        return this.props.weight ?? null;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    // Cálculo de poder total das estatísticas base (BST - Base Stat Total)
    get baseStatTotal() {
        return this.hp + this.attack + this.defense + this.speed;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            primaryType: this.primaryType,
            secondaryType: this.secondaryType,
            type: this.type,
            types: this.types,
            hp: this.hp,
            attack: this.attack,
            defense: this.defense,
            speed: this.speed,
            baseStatTotal: this.baseStatTotal,
            height: this.height,
            weight: this.weight,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.Pokemon = Pokemon;
