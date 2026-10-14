import { Capture } from '@domain/entities/capture';
import { ICaptureRepository } from '@domain/repositories/capture.repository';

export class InMemoryCaptureRepository implements ICaptureRepository {
  public captures: Capture[] = [];

  async create(capture: Capture): Promise<void> {
    this.captures.push(capture);
  }

  async findByTrainerId(trainerId: string): Promise<Capture[]> {
    return this.captures.filter((c) => c.trainerId === trainerId);
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return this.captures.filter((c) => c.trainerId === trainerId).length;
  }

  async findById(id: string): Promise<Capture | null> {
    return this.captures.find((c) => c.id === id) ?? null;
  }
}
