"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPokemonStatsUseCase = void 0;
class GetPokemonStatsUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(id) {
        const pokemons = await this.pokeRepository.findAll();
        const typesCount = {};
        for (const pokemon of pokemons) {
            typesCount[pokemon.type] = (typesCount[pokemon.type] ?? 0) + 1;
        }
        return { totalPokemons: pokemons.length, typesCount };
    }
}
exports.GetPokemonStatsUseCase = GetPokemonStatsUseCase;
