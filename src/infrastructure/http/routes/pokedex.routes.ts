import { Router } from 'express';
import { makePokedexController } from '@main/factories/makePokedexController';
import { validate } from '@infrastructure/http/middlewares/validate.middleware';
import { searchPokedexQuerySchema } from '@infrastructure/http/validations/pokedex.schema';

const pokedexRoutes = Router();
const pokedexController = makePokedexController();

pokedexRoutes.get(
  '/api/v1/pokedex/search',
  validate({ query: searchPokedexQuerySchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokedex']
      #swagger.summary = 'Consulta direto na PokéAPI externa'
      #swagger.description = 'Busca um Pokémon na PokéAPI oficial pelo nome e retorna o DTO formatado com atributos e tipos.'
      #swagger.parameters['name'] = { in: 'query', required: true, type: 'string', description: 'Nome do Pokémon (ex: pikachu, charizard)' }
      #swagger.responses[200] = {
        description: 'Dados da PokéAPI retornados com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/PokedexSearchResponse' } } }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado na PokéAPI.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return pokedexController.search(req, res, next);
  },
);

export { pokedexRoutes };
