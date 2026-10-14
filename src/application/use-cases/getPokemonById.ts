import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { Pokemon } from '@domain/entities/pokemon';
import { NotFoundError } from '@domain/errors/NotFoundError';

export class GetPokemonByIdUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon> {
    const pokemon = await this.pokeRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError(id, 'Pokémon');
    }

    return pokemon;
  }
}
