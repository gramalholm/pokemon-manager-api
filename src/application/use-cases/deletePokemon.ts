import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { NotFoundError } from '@domain/errors/NotFoundError';

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new NotFoundError(id, 'Pokémon');
    }
    await this.pokemonRepository.delete(id);
  }
}
