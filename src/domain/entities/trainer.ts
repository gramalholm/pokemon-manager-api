export interface TrainerProps {
  id: string;
  name: string;
  email: string;
  region?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Trainer {
  private props: TrainerProps;

  constructor(props: TrainerProps) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('O nome do treinador é obrigatório.');
    }

    if (!props.email || !props.email.includes('@')) {
      throw new Error('O email do treinador deve ser válido.');
    }

    this.props = {
      id: props.id,
      name: props.name.trim(),
      email: props.email.trim().toLowerCase(),
      region: props.region?.trim() || 'Kanto',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get region(): string {
    return this.props.region ?? 'Kanto';
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      region: this.region,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
