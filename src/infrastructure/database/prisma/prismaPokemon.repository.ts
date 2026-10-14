import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonFilter,
  IPokemonRepository,
} from '@domain/repositories/pokemon.repository';
import { prisma } from './prismaClient';
import { PokemonType } from '@domain/enums/pokemon-type.enum';

export class PrismaPokemonRepository implements IPokemonRepository {
  private toDomain(row: {
    id: string;
    name: string;
    primaryType: string;
    secondaryType: string | null;
    hp: number;
    attack: number | null;
    defense: number | null;
    speed: number | null;
    height: number | null;
    weight: number | null;
    createdAt: Date;
    updatedAt: Date;
  }): Pokemon {
    return new Pokemon({
      id: row.id,
      name: row.name,
      primaryType: row.primaryType as PokemonType,
      secondaryType: (row.secondaryType as PokemonType) ?? null,
      hp: row.hp,
      attack: row.attack ?? 50,
      defense: row.defense ?? 50,
      speed: row.speed ?? 50,
      height: row.height,
      weight: row.weight,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.upsert({
      where: { id: pokemon.id },
      create: {
        id: pokemon.id,
        name: pokemon.name,
        primaryType: pokemon.primaryType,
        secondaryType: pokemon.secondaryType,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
      },
      update: {
        name: pokemon.name,
        primaryType: pokemon.primaryType,
        secondaryType: pokemon.secondaryType,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
      },
    });
  }

  async findAll(filter?: IPokemonFilter): Promise<Pokemon[]> {
    const whereClause: {
      OR?: Array<{ primaryType: PokemonType } | { secondaryType: PokemonType }>;
      name?: { contains: string; mode: 'insensitive' };
    } = {};

    if (filter?.type) {
      const typeFilter = filter.type.trim().toUpperCase() as PokemonType;
      whereClause.OR = [
        { primaryType: typeFilter },
        { secondaryType: typeFilter },
      ];
    }

    if (filter?.name) {
      whereClause.name = {
        contains: filter.name.trim(),
        mode: 'insensitive',
      };
    }

    const rows = await prisma.pokemon.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return rows.map((r) => this.toDomain(r));
  }

  async findById(id: string): Promise<Pokemon | null> {
    const row = await prisma.pokemon.findUnique({
      where: { id },
    });

    if (!row) return null;
    return this.toDomain(row);
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const row = await prisma.pokemon.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive',
        },
      },
    });

    if (!row) return null;
    return this.toDomain(row);
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: {
        name: pokemon.name,
        primaryType: pokemon.primaryType,
        secondaryType: pokemon.secondaryType,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.pokemon.delete({
      where: { id },
    });
  }
}
