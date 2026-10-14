import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';

export class InMemoryTrainerRepository implements ITrainerRepository {
  public trainers: Trainer[] = [];

  async create(trainer: Trainer): Promise<void> {
    this.trainers.push(trainer);
  }

  async findById(id: string): Promise<Trainer | null> {
    return this.trainers.find((t) => t.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const cleanEmail = email.trim().toLowerCase();
    return (
      this.trainers.find((t) => t.email.toLowerCase() === cleanEmail) ?? null
    );
  }

  async findAll(): Promise<Trainer[]> {
    return this.trainers;
  }
}
