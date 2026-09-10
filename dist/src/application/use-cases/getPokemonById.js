"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPokemonByIdUseCase = void 0;
const NotFindError_1 = require("@domain/errors/NotFindError");
class GetPokemonByIdUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(id) {
        const pokemon = await this.pokeRepository.findById(id);
        if (!pokemon) {
            throw new NotFindError_1.NotFoundError(id);
        }
        return pokemon;
    }
}
exports.GetPokemonByIdUseCase = GetPokemonByIdUseCase;
