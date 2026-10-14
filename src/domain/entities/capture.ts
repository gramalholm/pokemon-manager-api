import { Pokemon } from './pokemon';

export interface CaptureProps {
  id: string;
  trainerId: string;
  pokemonId: string;
  nickname?: string | null;
  level?: number;
  isShiny?: boolean;
  capturedAt?: Date;
  pokemon?: Pokemon;
}

export class Capture {
  private props: CaptureProps;

  constructor(props: CaptureProps) {
    if (!props.trainerId) {
      throw new Error('O ID do treinador é obrigatório na captura.');
    }
    if (!props.pokemonId) {
      throw new Error('O ID do Pokémon é obrigatório na captura.');
    }
    const level = props.level ?? 5;
    if (level < 1 || level > 100) {
      throw new Error('O nível do Pokémon deve estar entre 1 e 100.');
    }

    this.props = {
      id: props.id,
      trainerId: props.trainerId,
      pokemonId: props.pokemonId,
      nickname: props.nickname?.trim() || null,
      level,
      isShiny: props.isShiny ?? false,
      capturedAt: props.capturedAt ?? new Date(),
      pokemon: props.pokemon,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get trainerId(): string {
    return this.props.trainerId;
  }

  get pokemonId(): string {
    return this.props.pokemonId;
  }

  get nickname(): string | null {
    return this.props.nickname ?? null;
  }

  get level(): number {
    return this.props.level ?? 5;
  }

  get isShiny(): boolean {
    return this.props.isShiny ?? false;
  }

  get capturedAt(): Date {
    return this.props.capturedAt ?? new Date();
  }

  get pokemon(): Pokemon | undefined {
    return this.props.pokemon;
  }

  setPokemon(pokemon: Pokemon): void {
    this.props.pokemon = pokemon;
  }

  toJSON() {
    return {
      id: this.id,
      trainerId: this.trainerId,
      pokemonId: this.pokemonId,
      nickname: this.nickname,
      displayName:
        this.nickname || (this.pokemon ? this.pokemon.name : this.pokemonId),
      level: this.level,
      isShiny: this.isShiny,
      capturedAt: this.capturedAt,
      pokemon: this.pokemon ? this.pokemon.toJSON() : undefined,
    };
  }
}
