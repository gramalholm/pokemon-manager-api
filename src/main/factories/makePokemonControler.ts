import { InMemoryPokemonRepository } from "@infrastructure/database/in-memory/inMemoryPokemon.repository";
import { CreatePokemonUseCase } from "@application/use-cases/createPokemon";
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonUseCase } from '@application/use-cases/listPokemon';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon'
import { PokemonController } from "@infrastructure/http/controllers/pokemon.controller";

const pokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(){
    const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
    const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);
    const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
    const listPokemonUseCase = new ListPokemonUseCase(pokemonRepository);
    const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);

    const pokemonController = new PokemonController(
        createPokemonUseCase,
        deletePokemonUseCase,
        getPokemonByIdUseCase,
        listPokemonUseCase,
        updatePokemonUseCase
    );

    return pokemonController;
}