import { z } from 'zod';

export const searchPokedexQuerySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Parâmetro "name" é obrigatório para busca na Pokédex.'),
});
