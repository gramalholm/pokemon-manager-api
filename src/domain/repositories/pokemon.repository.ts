import { Pokemon } from '@domain/entities/pokemon';

export interface IPokemonFilter {
  type?: string;
  name?: string;
}

export interface IPokemonRepository {
  create(pokemon: Pokemon): Promise<void>;
  findAll(filter?: IPokemonFilter): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  findByName(name: string): Promise<Pokemon | null>;
  update(pokemon: Pokemon): Promise<void>;
  delete(id: string): Promise<void>;
}
