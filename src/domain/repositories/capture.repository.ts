import { Capture } from '@domain/entities/capture';

export interface ICaptureRepository {
  create(capture: Capture): Promise<void>;
  findByTrainerId(trainerId: string): Promise<Capture[]>;
  countByTrainerId(trainerId: string): Promise<number>;
  findById(id: string): Promise<Capture | null>;
}
