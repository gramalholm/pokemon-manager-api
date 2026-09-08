"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePokemonUseCase = void 0;
const pokemon_1 = require("@domain/entities/pokemon");
//terminar
class CreatePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(data) {
        const pokemon = new pokemon_1.Pokemon(data);
        await this.pokemonRepository.create(pokemon);
        return pokemon;
    }
}
exports.CreatePokemonUseCase = CreatePokemonUseCase;
