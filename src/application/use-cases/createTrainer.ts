import { randomUUID } from 'crypto';
import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ConflictError } from '@domain/errors/ConflictError';
import { CreateTrainerDTO } from '@application/dtos/createTrainerDTO';

export class CreateTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    const existing = await this.trainerRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError(
        `Já existe um treinador cadastrado com o email "${data.email}".`,
      );
    }

    const trainer = new Trainer({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      region: data.region,
    });

    await this.trainerRepository.create(trainer);
    return trainer;
  }
}
