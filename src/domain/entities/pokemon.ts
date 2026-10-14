import { PokemonType, parsePokemonType } from '@domain/enums/pokemon-type.enum';

export interface PokemonProps {
  id: string;
  name: string;
  primaryType: PokemonType;
  secondaryType?: PokemonType | null;
  hp: number;
  attack?: number;
  defense?: number;
  speed?: number;
  height?: number | null;
  weight?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(
    props: Omit<PokemonProps, 'primaryType'> & {
      primaryType?: PokemonType;
      secondaryType?: PokemonType | null;
    },
  ) {
    if (props.hp <= 0) {
      throw new Error('O HP do Pokémon deve ser maior que zero.');
    }

    let primary = props.primaryType;
    let secondary = props.secondaryType ?? null;

    if (!primary && props.type) {
      if (props.type.includes('/')) {
        const [t1, t2] = props.type.split('/');
        primary = parsePokemonType(t1);
        secondary = parsePokemonType(t2);
      } else {
        primary = parsePokemonType(props.type);
      }
    }

    if (!primary) {
      throw new Error(
        'O tipo primário (primaryType) do Pokémon é obrigatório.',
      );
    }

    if (secondary && primary === secondary) {
      throw new Error(
        'O Pokémon não pode ter o tipo secundário idêntico ao tipo primário.',
      );
    }

    this.props = {
      id: props.id,
      name: props.name.trim(),
      primaryType: primary,
      secondaryType: secondary,
      hp: props.hp,
      attack: props.attack ?? 50,
      defense: props.defense ?? 50,
      speed: props.speed ?? 50,
      height: props.height ?? null,
      weight: props.weight ?? null,
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

  get primaryType(): PokemonType {
    return this.props.primaryType;
  }

  get secondaryType(): PokemonType | null {
    return this.props.secondaryType ?? null;
  }

  get types(): PokemonType[] {
    return this.props.secondaryType
      ? [this.props.primaryType, this.props.secondaryType]
      : [this.props.primaryType];
  }

  // Compatibilidade com contrato anterior
  get type(): string {
    return this.props.secondaryType
      ? `${this.props.primaryType}/${this.props.secondaryType}`
      : this.props.primaryType;
  }

  get hp(): number {
    return this.props.hp;
  }

  get attack(): number {
    return this.props.attack ?? 50;
  }

  get defense(): number {
    return this.props.defense ?? 50;
  }

  get speed(): number {
    return this.props.speed ?? 50;
  }

  get height(): number | null {
    return this.props.height ?? null;
  }

  get weight(): number | null {
    return this.props.weight ?? null;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // Cálculo de poder total das estatísticas base (BST - Base Stat Total)
  get baseStatTotal(): number {
    return this.hp + this.attack + this.defense + this.speed;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      primaryType: this.primaryType,
      secondaryType: this.secondaryType,
      type: this.type,
      types: this.types,
      hp: this.hp,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      baseStatTotal: this.baseStatTotal,
      height: this.height,
      weight: this.weight,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
