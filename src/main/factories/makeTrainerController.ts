import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeam';
import { TrainerController } from '@infrastructure/http/controllers/trainer.controller';
import { AxiosPokeApiGateway } from '@infrastructure/providers/pokeApiGateway';
import {
  trainerRepository,
  captureRepository,
  pokemonRepository,
} from './repositories.factory';

export function makeTrainerController(): TrainerController {
  const pokeApiGateway = new AxiosPokeApiGateway();

  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);
  const capturePokemonUseCase = new CapturePokemonUseCase(
    trainerRepository,
    captureRepository,
    pokemonRepository,
    pokeApiGateway,
  );
  const getTrainerTeamUseCase = new GetTrainerTeamUseCase(
    trainerRepository,
    captureRepository,
    pokemonRepository,
  );

  return new TrainerController(
    createTrainerUseCase,
    capturePokemonUseCase,
    getTrainerTeamUseCase,
  );
}
