import {
  IPokeApiGateway,
  PokeApiPokemonDTO,
} from '@application/gateways/pokeapi.gateway';

export class SearchPokeApiUseCase {
  constructor(private pokeApiGateway: IPokeApiGateway) {}

  async execute(name: string): Promise<PokeApiPokemonDTO> {
    return await this.pokeApiGateway.searchPokemon(name);
  }
}
