import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class ListPokemonUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(): Promise<Pokemon[]> {
    return await this.pokeRepository.findAll();
  }
}
