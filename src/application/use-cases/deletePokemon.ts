import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { NotFoundError } from '@domain/errors/NotFindError';

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) throw new NotFoundError(id);
    await this.pokemonRepository.delete(id);
  }
}
