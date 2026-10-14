import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { prisma } from './prismaClient';

export class PrismaTrainerRepository implements ITrainerRepository {
  private toDomain(row: {
    id: string;
    name: string;
    email: string;
    region: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Trainer {
    return new Trainer({
      id: row.id,
      name: row.name,
      email: row.email,
      region: row.region ?? 'Kanto',
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async create(trainer: Trainer): Promise<void> {
    await prisma.trainer.create({
      data: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        region: trainer.region,
      },
    });
  }

  async findById(id: string): Promise<Trainer | null> {
    const row = await prisma.trainer.findUnique({
      where: { id },
    });
    if (!row) return null;
    return this.toDomain(row);
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const row = await prisma.trainer.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (!row) return null;
    return this.toDomain(row);
  }

  async findAll(): Promise<Trainer[]> {
    const rows = await prisma.trainer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
