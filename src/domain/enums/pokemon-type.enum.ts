export enum PokemonType {
  NORMAL = 'NORMAL',
  FIRE = 'FIRE',
  WATER = 'WATER',
  GRASS = 'GRASS',
  ELECTRIC = 'ELECTRIC',
  ICE = 'ICE',
  FIGHTING = 'FIGHTING',
  POISON = 'POISON',
  GROUND = 'GROUND',
  FLYING = 'FLYING',
  PSYCHIC = 'PSYCHIC',
  BUG = 'BUG',
  ROCK = 'ROCK',
  GHOST = 'GHOST',
  DRAGON = 'DRAGON',
  STEEL = 'STEEL',
  FAIRY = 'FAIRY',
  DARK = 'DARK',
}

export function parsePokemonType(typeStr: string): PokemonType {
  const normalized = typeStr.trim().toUpperCase();
  if (Object.values(PokemonType).includes(normalized as PokemonType)) {
    return normalized as PokemonType;
  }
  throw new Error(
    `Tipo de Pokémon inválido: "${typeStr}". Tipos permitidos: ${Object.values(PokemonType).join(', ')}`,
  );
}

export function isValidPokemonType(typeStr: string): boolean {
  return Object.values(PokemonType).includes(
    typeStr.trim().toUpperCase() as PokemonType,
  );
}
