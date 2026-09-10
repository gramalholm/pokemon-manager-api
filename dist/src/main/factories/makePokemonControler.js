"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePokemonController = makePokemonController;
const inMemoryPokemon_repository_1 = require("@infrastructure/database/in-memory/inMemoryPokemon.repository");
const createPokemon_1 = require("@application/use-cases/createPokemon");
const deletePokemon_1 = require("@application/use-cases/deletePokemon");
const getPokemonById_1 = require("@application/use-cases/getPokemonById");
const listPokemon_1 = require("@application/use-cases/listPokemon");
const updatePokemon_1 = require("@application/use-cases/updatePokemon");
const pokemon_controller_1 = require("@infrastructure/http/controllers/pokemon.controller");
const pokemonRepository = new inMemoryPokemon_repository_1.InMemoryPokemonRepository();
function makePokemonController() {
    const createPokemonUseCase = new createPokemon_1.CreatePokemonUseCase(pokemonRepository);
    const deletePokemonUseCase = new deletePokemon_1.DeletePokemonUseCase(pokemonRepository);
    const getPokemonByIdUseCase = new getPokemonById_1.GetPokemonByIdUseCase(pokemonRepository);
    const listPokemonUseCase = new listPokemon_1.ListPokemonUseCase(pokemonRepository);
    const updatePokemonUseCase = new updatePokemon_1.UpdatePokemonUseCase(pokemonRepository);
    const pokemonController = new pokemon_controller_1.PokemonController(createPokemonUseCase, deletePokemonUseCase, getPokemonByIdUseCase, listPokemonUseCase, updatePokemonUseCase);
    return pokemonController;
}
