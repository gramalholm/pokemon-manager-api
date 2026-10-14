import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { CreatePokemonDTO } from '@application/dtos/createPokemonsDTO';

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemon = new Pokemon({
      id: data.id,
      name: data.name,
      primaryType: data.primaryType,
      secondaryType: data.secondaryType,
      type: data.type,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
    });
    await this.pokemonRepository.create(pokemon);
    return pokemon;
  }
}
