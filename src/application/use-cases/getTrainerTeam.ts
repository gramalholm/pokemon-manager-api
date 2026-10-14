import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { NotFoundError } from '@domain/errors/NotFoundError';
import { Trainer } from '@domain/entities/trainer';
import { Capture } from '@domain/entities/capture';

export interface TrainerTeamResponse {
  trainer: ReturnType<Trainer['toJSON']>;
  teamCount: number;
  maxTeamSize: number;
  team: ReturnType<Capture['toJSON']>[];
}

export class GetTrainerTeamUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private captureRepository: ICaptureRepository,
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(trainerId: string): Promise<TrainerTeamResponse> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new NotFoundError(trainerId, 'Treinador');
    }

    const captures = await this.captureRepository.findByTrainerId(trainerId);

    // Garante que todos os Pokémons estejam preenchidos nas capturas
    for (const capture of captures) {
      if (!capture.pokemon) {
        const poke = await this.pokemonRepository.findById(capture.pokemonId);
        if (poke) {
          capture.setPokemon(poke);
        }
      }
    }

    return {
      trainer: trainer.toJSON(),
      teamCount: captures.length,
      maxTeamSize: 6,
      team: captures.map((c) => c.toJSON()),
    };
  }
}
