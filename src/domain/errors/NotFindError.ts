export class NotFoundError extends Error {
  constructor(id: string) {
    super(`Pokémon com id ${id} não encontrado`);
    this.name = 'PokemonNotFoundError';
  }
}