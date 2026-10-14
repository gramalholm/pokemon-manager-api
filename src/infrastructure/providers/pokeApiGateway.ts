import axios, { AxiosError } from 'axios';
import {
  IPokeApiGateway,
  PokeApiPokemonDTO,
} from '@application/gateways/pokeapi.gateway';
import { parsePokemonType, PokemonType } from '@domain/enums/pokemon-type.enum';
import { PokeApiError } from '@domain/errors/PokeApiError';

interface RawPokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface RawPokeApiType {
  slot: number;
  type: {
    name: string;
  };
}

interface RawPokeApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: RawPokeApiType[];
  stats: RawPokeApiStat[];
}

export class AxiosPokeApiGateway implements IPokeApiGateway {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async searchPokemon(name: string): Promise<PokeApiPokemonDTO> {
    const cleanName = name.trim().toLowerCase();

    try {
      const response = await axios.get<RawPokeApiResponse>(
        `${this.baseUrl}/${cleanName}`,
        { timeout: 8000 },
      );

      const data = response.data;

      // Ordenar por slot para garantir tipo primário e secundário
      const sortedTypes = [...data.types].sort((a, b) => a.slot - b.slot);

      const primaryType: PokemonType = parsePokemonType(
        sortedTypes[0].type.name,
      );
      const secondaryType: PokemonType | null =
        sortedTypes.length > 1
          ? parsePokemonType(sortedTypes[1].type.name)
          : null;

      const types: PokemonType[] = secondaryType
        ? [primaryType, secondaryType]
        : [primaryType];

      const getStat = (statName: string): number => {
        const found = data.stats.find((s) => s.stat.name === statName);
        return found ? found.base_stat : 50;
      };

      const hp = getStat('hp');
      const attack = getStat('attack');
      const defense = getStat('defense');
      const speed = getStat('speed');

      return {
        id: String(data.id),
        name: data.name,
        primaryType,
        secondaryType,
        types,
        hp,
        attack,
        defense,
        speed,
        height: data.height ?? null,
        weight: data.weight ?? null,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          throw new PokeApiError(
            cleanName,
            'Pokémon não encontrado na PokéAPI oficial.',
          );
        }
        throw new PokeApiError(
          cleanName,
          `Erro ao consultar serviço externo: ${axiosError.message}`,
        );
      }
      throw error;
    }
  }
}
