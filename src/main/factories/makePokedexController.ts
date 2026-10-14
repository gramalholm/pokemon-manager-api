import { SearchPokeApiUseCase } from '@application/use-cases/searchPokeApi';
import { PokedexController } from '@infrastructure/http/controllers/pokedex.controller';
import { AxiosPokeApiGateway } from '@infrastructure/providers/pokeApiGateway';

export function makePokedexController(): PokedexController {
  const pokeApiGateway = new AxiosPokeApiGateway();
  const searchPokeApiUseCase = new SearchPokeApiUseCase(pokeApiGateway);

  return new PokedexController(searchPokeApiUseCase);
}
