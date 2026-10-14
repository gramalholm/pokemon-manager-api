import { PokemonType } from '@domain/enums/pokemon-type.enum';

export interface CreatePokemonDTO {
  id: string;
  name: string;
  primaryType?: PokemonType;
  secondaryType?: PokemonType | null;
  type?: string;
  hp: number;
  attack?: number;
  defense?: number;
  speed?: number;
  height?: number | null;
  weight?: number | null;
}
