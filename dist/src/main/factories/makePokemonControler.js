"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePokemonController = makePokemonController;
const createPokemon_1 = require("@application/use-cases/createPokemon");
const deletePokemon_1 = require("@application/use-cases/deletePokemon");
const getPokemonById_1 = require("@application/use-cases/getPokemonById");
const listPokemon_1 = require("@application/use-cases/listPokemon");
const updatePokemon_1 = require("@application/use-cases/updatePokemon");
const pokemon_controller_1 = require("@infrastructure/http/controllers/pokemon.controller");
const repositories_factory_1 = require("./repositories.factory");
function makePokemonController() {
    const createPokemonUseCase = new createPokemon_1.CreatePokemonUseCase(repositories_factory_1.pokemonRepository);
    const deletePokemonUseCase = new deletePokemon_1.DeletePokemonUseCase(repositories_factory_1.pokemonRepository);
    const getPokemonByIdUseCase = new getPokemonById_1.GetPokemonByIdUseCase(repositories_factory_1.pokemonRepository);
    const listPokemonUseCase = new listPokemon_1.ListPokemonUseCase(repositories_factory_1.pokemonRepository);
    const updatePokemonUseCase = new updatePokemon_1.UpdatePokemonUseCase(repositories_factory_1.pokemonRepository);
    return new pokemon_controller_1.PokemonController(createPokemonUseCase, deletePokemonUseCase, getPokemonByIdUseCase, listPokemonUseCase, updatePokemonUseCase);
}
