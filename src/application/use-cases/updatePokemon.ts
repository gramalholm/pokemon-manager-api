import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { NotFoundError } from '@domain/errors/NotFoundError';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';

export class UpdatePokemonUseCase {
  constructor(private pokeRepository: IPokemonRepository) {}

  async execute(id: string, updt_data: UpdatePokemonDTO): Promise<Pokemon> {
    const pokemon = await this.pokeRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError(id, 'Pokémon');
    }

    const updated_pokemon = new Pokemon({
      id: pokemon.id,
      name: updt_data.name ?? pokemon.name,
      primaryType: updt_data.primaryType ?? pokemon.primaryType,
      secondaryType:
        updt_data.secondaryType !== undefined
          ? updt_data.secondaryType
          : pokemon.secondaryType,
      type: updt_data.type,
      hp: updt_data.hp ?? pokemon.hp,
      attack: updt_data.attack ?? pokemon.attack,
      defense: updt_data.defense ?? pokemon.defense,
      speed: updt_data.speed ?? pokemon.speed,
      height:
        updt_data.height !== undefined ? updt_data.height : pokemon.height,
      weight:
        updt_data.weight !== undefined ? updt_data.weight : pokemon.weight,
    });

    await this.pokeRepository.update(updated_pokemon);
    return updated_pokemon;
  }
}
