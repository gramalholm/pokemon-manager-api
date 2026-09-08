"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPokemonUseCase = void 0;
class ListPokemonUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute() {
        return await this.pokeRepository.findAll();
    }
}
exports.ListPokemonUseCase = ListPokemonUseCase;
