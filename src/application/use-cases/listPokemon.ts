import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonFilter,
  IPokemonRepository,
} from '@domain/repositories/pokemon.repository';

export class ListPokemonUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(filter?: IPokemonFilter): Promise<Pokemon[]> {
    return await this.pokeRepository.findAll(filter);
  }
}
