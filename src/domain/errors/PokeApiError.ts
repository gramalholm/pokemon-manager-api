import { AppError } from './AppError';

export class PokeApiError extends AppError {
  constructor(
    pokemonName: string,
    message = 'Pokémon não encontrado na PokéAPI.',
  ) {
    super(
      `[PokéAPI] Falha ao consultar Pokémon "${pokemonName}": ${message}`,
      404,
    );
    this.name = 'PokeApiError';
  }
}
