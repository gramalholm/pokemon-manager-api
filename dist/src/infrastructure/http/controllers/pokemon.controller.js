"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
class PokemonController {
    createPokemon;
    deletePokemon;
    getPokemonStats;
    listPokemons;
    updatePokemon;
    constructor(createPokemon, deletePokemon, getPokemonStats, listPokemons, updatePokemon) {
        this.createPokemon = createPokemon;
        this.deletePokemon = deletePokemon;
        this.getPokemonStats = getPokemonStats;
        this.listPokemons = listPokemons;
        this.updatePokemon = updatePokemon;
    }
    create = async (req, res) => {
        const pokemon = await this.createPokemon();
    };
}
exports.PokemonController = PokemonController;
//implementar
