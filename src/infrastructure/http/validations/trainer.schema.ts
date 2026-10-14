import { z } from 'zod';

export const createTrainerSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve conter pelo menos 2 caracteres.'),
  email: z.string().trim().email('Email inválido.'),
  region: z.string().trim().optional(),
});

export const trainerIdParamSchema = z.object({
  trainerId: z.string().min(1, 'trainerId é obrigatório.'),
});

export const capturePokemonSchema = z.object({
  pokemonName: z
    .string()
    .trim()
    .min(1, 'Nome do Pokémon (pokemonName) é obrigatório.'),
  nickname: z.string().trim().max(30).optional(),
  level: z
    .number()
    .int()
    .min(1, 'Nível mínimo é 1.')
    .max(100, 'Nível máximo é 100.')
    .optional(),
  isShiny: z.boolean().optional(),
});
