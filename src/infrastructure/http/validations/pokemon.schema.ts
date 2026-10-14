import { z } from 'zod';
import { PokemonType } from '@domain/enums/pokemon-type.enum';

const pokemonTypeValues = Object.values(PokemonType) as [string, ...string[]];

export const createPokemonSchema = z
  .object({
    id: z.string().min(1, 'ID é obrigatório.'),
    name: z.string().min(1, 'Nome é obrigatório.'),
    primaryType: z
      .string()
      .transform((val) => val.toUpperCase())
      .refine(
        (val) => pokemonTypeValues.includes(val),
        `Tipo primário inválido. Valores válidos: ${pokemonTypeValues.join(', ')}`,
      )
      .optional(),
    secondaryType: z
      .string()
      .transform((val) => val.toUpperCase())
      .refine(
        (val) => pokemonTypeValues.includes(val),
        `Tipo secundário inválido. Valores válidos: ${pokemonTypeValues.join(', ')}`,
      )
      .nullable()
      .optional(),
    type: z.string().optional(),
    hp: z.number().int().positive('HP deve ser maior que 0.'),
    attack: z.number().int().nonnegative('Ataque deve ser >= 0.').optional(),
    defense: z.number().int().nonnegative('Defesa deve ser >= 0.').optional(),
    speed: z.number().int().nonnegative('Velocidade deve ser >= 0.').optional(),
    height: z.number().int().positive().nullable().optional(),
    weight: z.number().int().positive().nullable().optional(),
  })
  .refine((data) => data.primaryType !== undefined || data.type !== undefined, {
    message: 'Informe ao menos primaryType ou type.',
    path: ['primaryType'],
  });

export const updatePokemonSchema = z.object({
  name: z.string().min(1, 'Nome não pode ser vazio.').optional(),
  primaryType: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine(
      (val) => pokemonTypeValues.includes(val),
      `Tipo primário inválido. Valores válidos: ${pokemonTypeValues.join(', ')}`,
    )
    .optional(),
  secondaryType: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine(
      (val) => pokemonTypeValues.includes(val),
      `Tipo secundário inválido. Valores válidos: ${pokemonTypeValues.join(', ')}`,
    )
    .nullable()
    .optional(),
  type: z.string().optional(),
  hp: z.number().int().positive('HP deve ser maior que 0.').optional(),
  attack: z.number().int().nonnegative('Ataque deve ser >= 0.').optional(),
  defense: z.number().int().nonnegative('Defesa deve ser >= 0.').optional(),
  speed: z.number().int().nonnegative('Velocidade deve ser >= 0.').optional(),
  height: z.number().int().positive().nullable().optional(),
  weight: z.number().int().positive().nullable().optional(),
});

export const pokemonFilterSchema = z.object({
  type: z.string().optional(),
  name: z.string().optional(),
});

export const pokemonIdParamSchema = z.object({
  id: z.string().min(1, 'ID do Pokémon é obrigatório.'),
});
