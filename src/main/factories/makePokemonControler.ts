import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonUseCase } from '@application/use-cases/listPokemon';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';
import { pokemonRepository } from './repositories.factory';

export function makePokemonController(): PokemonController {
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const listPokemonUseCase = new ListPokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);

  return new PokemonController(
    createPokemonUseCase,
    deletePokemonUseCase,
    getPokemonByIdUseCase,
    listPokemonUseCase,
    updatePokemonUseCase,
  );
}
