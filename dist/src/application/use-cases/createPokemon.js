"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePokemonUseCase = void 0;
const pokemon_1 = require("@domain/entities/pokemon");
class CreatePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(data) {
        const pokemon = new pokemon_1.Pokemon({
            id: data.id,
            name: data.name,
            primaryType: data.primaryType,
            secondaryType: data.secondaryType,
            type: data.type,
            hp: data.hp,
            attack: data.attack,
            defense: data.defense,
            speed: data.speed,
            height: data.height,
            weight: data.weight,
        });
        await this.pokemonRepository.create(pokemon);
        return pokemon;
    }
}
exports.CreatePokemonUseCase = CreatePokemonUseCase;
