import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon.repository";
import { PokemonProps } from '@domain/entities/pokemon';
import { NotFoundError } from "@domain/errors/NotFindError";

interface PokeStats {
  totalPokemons: number;
  typesCount: Record<string, number>;
}

export class GetPokemonByIdUseCase {
    constructor(private pokeRepository: IPokemonRepository){}

    async execute(id: string): Promise<PokemonProps> {

            const pokemon = await this.pokeRepository.findById(id);

            if (!pokemon) {
                throw new Error("Pokémon não encontrado.");
            }

            return pokemon;
    }
}