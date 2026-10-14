import { PokemonType } from '@domain/enums/pokemon-type.enum';

export interface PokeApiPokemonDTO {
  id: string;
  name: string;
  primaryType: PokemonType;
  secondaryType: PokemonType | null;
  types: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  height: number | null;
  weight: number | null;
}

export interface IPokeApiGateway {
  searchPokemon(name: string): Promise<PokeApiPokemonDTO>;
}
