import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonFilter,
  IPokemonRepository,
} from '@domain/repositories/pokemon.repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  public pokemons: Pokemon[] = [];

  async create(pokemon: Pokemon): Promise<void> {
    const existingIndex = this.pokemons.findIndex((p) => p.id === pokemon.id);
    if (existingIndex >= 0) {
      this.pokemons[existingIndex] = pokemon;
    } else {
      this.pokemons.push(pokemon);
    }
  }

  async findAll(filter?: IPokemonFilter): Promise<Pokemon[]> {
    let result = [...this.pokemons];

    if (filter?.type) {
      const typeFilter = filter.type.trim().toUpperCase();
      result = result.filter(
        (p) =>
          p.primaryType.toUpperCase() === typeFilter ||
          (p.secondaryType && p.secondaryType.toUpperCase() === typeFilter),
      );
    }

    if (filter?.name) {
      const nameFilter = filter.name.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(nameFilter));
    }

    return result;
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.pokemons.find((p) => p.id === id) ?? null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const cleanName = name.trim().toLowerCase();
    return (
      this.pokemons.find((p) => p.name.toLowerCase() === cleanName) ?? null
    );
  }

  async update(pokemon: Pokemon): Promise<void> {
    const index = this.pokemons.findIndex((p) => p.id === pokemon.id);
    if (index >= 0) {
      this.pokemons[index] = pokemon;
    }
  }

  async delete(id: string): Promise<void> {
    this.pokemons = this.pokemons.filter((p) => p.id !== id);
  }
}
