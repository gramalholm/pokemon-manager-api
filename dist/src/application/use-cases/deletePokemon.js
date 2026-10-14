"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePokemonUseCase = void 0;
const NotFoundError_1 = require("@domain/errors/NotFoundError");
class DeletePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(id) {
        const pokemon = await this.pokemonRepository.findById(id);
        if (!pokemon) {
            throw new NotFoundError_1.NotFoundError(id, 'Pokémon');
        }
        await this.pokemonRepository.delete(id);
    }
}
exports.DeletePokemonUseCase = DeletePokemonUseCase;
