import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { PrismaPokemonRepository } from '@infrastructure/database/prisma/prismaPokemon.repository';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prismaTrainer.repository';
import { PrismaCaptureRepository } from '@infrastructure/database/prisma/prismaCapture.repository';
import { InMemoryPokemonRepository } from '@infrastructure/database/in-memory/inMemoryPokemon.repository';
import { InMemoryTrainerRepository } from '@infrastructure/database/in-memory/inMemoryTrainer.repository';
import { InMemoryCaptureRepository } from '@infrastructure/database/in-memory/inMemoryCapture.repository';

const isInMemory =
  process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';

export const pokemonRepository: IPokemonRepository = isInMemory
  ? new InMemoryPokemonRepository()
  : new PrismaPokemonRepository();

export const trainerRepository: ITrainerRepository = isInMemory
  ? new InMemoryTrainerRepository()
  : new PrismaTrainerRepository();

export const captureRepository: ICaptureRepository = isInMemory
  ? new InMemoryCaptureRepository()
  : new PrismaCaptureRepository();
