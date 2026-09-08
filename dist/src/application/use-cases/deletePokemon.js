"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePokemonUseCase = void 0;
const notFindError_1 = require("@domain/errors/notFindError");
class DeletePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(id) {
        const pokemon = await this.pokemonRepository.findById(id);
        if (!pokemon)
            throw new notFindError_1.NotFoundError(id);
        await this.pokemonRepository.delete(id);
    }
}
exports.DeletePokemonUseCase = DeletePokemonUseCase;
