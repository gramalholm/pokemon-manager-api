import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { NotFoundError } from '@domain/errors/NotFindError';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';

export class UpdatePokemonUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(id: string, updt_data: UpdatePokemonDTO): Promise<Pokemon> {
    let pokemon: Pokemon | null;

    if (!(pokemon = await this.pokeRepository.findById(id))) {
      throw new NotFoundError(id);
    }

    const updated_pokemon = new Pokemon({
      id: pokemon.id,
      name: updt_data.name ?? pokemon.name,
      type: updt_data.type ?? pokemon.type,
      hp: pokemon.hp,
    });

    await this.pokeRepository.update(updated_pokemon);
    return updated_pokemon;
  }
}
