import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

interface CreatePokemonDTO {
  id: string;
  name: string;
  type: string;
  hp: number;
}

//terminar
export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemon = new Pokemon(data);
    await this.pokemonRepository.create(pokemon);
    return pokemon;
  }
}
