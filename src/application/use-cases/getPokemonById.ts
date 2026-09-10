import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { PokemonProps } from '@domain/entities/pokemon';
import { NotFoundError } from '@domain/errors/NotFindError';

export class GetPokemonByIdUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(id: string): Promise<PokemonProps> {
    const pokemon = await this.pokeRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError(id);
    }

    return pokemon;
  }
}
