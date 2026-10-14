import { AppError } from './AppError';

export class MaxTeamSizeError extends AppError {
  constructor(trainerId: string) {
    super(
      `Treinador ${trainerId} já atingiu o limite máximo de 6 Pokémons em seu time ativo.`,
      400,
    );
    this.name = 'MaxTeamSizeError';
  }
}
