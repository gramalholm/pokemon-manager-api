import { Capture } from '@domain/entities/capture';
import { Pokemon } from '@domain/entities/pokemon';
import { PokemonType } from '@domain/enums/pokemon-type.enum';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { prisma } from './prismaClient';

export class PrismaCaptureRepository implements ICaptureRepository {
  async create(capture: Capture): Promise<void> {
    await prisma.capture.create({
      data: {
        id: capture.id,
        trainerId: capture.trainerId,
        pokemonId: capture.pokemonId,
        nickname: capture.nickname,
        level: capture.level,
        isShiny: capture.isShiny,
        capturedAt: capture.capturedAt,
      },
    });
  }

  async findByTrainerId(trainerId: string): Promise<Capture[]> {
    const rows = await prisma.capture.findMany({
      where: { trainerId },
      include: {
        pokemon: true,
      },
      orderBy: { capturedAt: 'asc' },
    });

    return rows.map((row) => {
      const pokemon = row.pokemon
        ? new Pokemon({
            id: row.pokemon.id,
            name: row.pokemon.name,
            primaryType: row.pokemon.primaryType as PokemonType,
            secondaryType: (row.pokemon.secondaryType as PokemonType) ?? null,
            hp: row.pokemon.hp,
            attack: row.pokemon.attack ?? 50,
            defense: row.pokemon.defense ?? 50,
            speed: row.pokemon.speed ?? 50,
            height: row.pokemon.height,
            weight: row.pokemon.weight,
            createdAt: row.pokemon.createdAt,
            updatedAt: row.pokemon.updatedAt,
          })
        : undefined;

      return new Capture({
        id: row.id,
        trainerId: row.trainerId,
        pokemonId: row.pokemonId,
        nickname: row.nickname,
        level: row.level,
        isShiny: row.isShiny,
        capturedAt: row.capturedAt,
        pokemon,
      });
    });
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return await prisma.capture.count({
      where: { trainerId },
    });
  }

  async findById(id: string): Promise<Capture | null> {
    const row = await prisma.capture.findUnique({
      where: { id },
      include: { pokemon: true },
    });

    if (!row) return null;

    const pokemon = row.pokemon
      ? new Pokemon({
          id: row.pokemon.id,
          name: row.pokemon.name,
          primaryType: row.pokemon.primaryType as PokemonType,
          secondaryType: (row.pokemon.secondaryType as PokemonType) ?? null,
          hp: row.pokemon.hp,
          attack: row.pokemon.attack ?? 50,
          defense: row.pokemon.defense ?? 50,
          speed: row.pokemon.speed ?? 50,
          height: row.pokemon.height,
          weight: row.pokemon.weight,
          createdAt: row.pokemon.createdAt,
          updatedAt: row.pokemon.updatedAt,
        })
      : undefined;

    return new Capture({
      id: row.id,
      trainerId: row.trainerId,
      pokemonId: row.pokemonId,
      nickname: row.nickname,
      level: row.level,
      isShiny: row.isShiny,
      capturedAt: row.capturedAt,
      pokemon,
    });
  }
}
