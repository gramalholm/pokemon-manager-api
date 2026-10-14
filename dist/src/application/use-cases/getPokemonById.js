"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPokemonByIdUseCase = void 0;
const NotFoundError_1 = require("@domain/errors/NotFoundError");
class GetPokemonByIdUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(id) {
        const pokemon = await this.pokeRepository.findById(id);
        if (!pokemon) {
            throw new NotFoundError_1.NotFoundError(id, 'Pokémon');
        }
        return pokemon;
    }
}
exports.GetPokemonByIdUseCase = GetPokemonByIdUseCase;
