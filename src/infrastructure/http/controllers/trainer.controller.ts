import { Request, Response, NextFunction } from 'express';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeam';

export class TrainerController {
  constructor(
    private createTrainerUseCase: CreateTrainerUseCase,
    private capturePokemonUseCase: CapturePokemonUseCase,
    private getTrainerTeamUseCase: GetTrainerTeamUseCase,
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const trainer = await this.createTrainerUseCase.execute(req.body);
      res.status(201).json(trainer.toJSON());
    } catch (error) {
      next(error);
    }
  };

  capture = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { trainerId } = req.params as { trainerId: string };
      const capture = await this.capturePokemonUseCase.execute(
        trainerId,
        req.body,
      );
      res.status(201).json(capture.toJSON());
    } catch (error) {
      next(error);
    }
  };

  getTeam = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { trainerId } = req.params as { trainerId: string };
      const result = await this.getTrainerTeamUseCase.execute(trainerId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
