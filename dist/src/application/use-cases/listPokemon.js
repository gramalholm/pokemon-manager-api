"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPokemonUseCase = void 0;
class ListPokemonUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(filter) {
        return await this.pokeRepository.findAll(filter);
    }
}
exports.ListPokemonUseCase = ListPokemonUseCase;
