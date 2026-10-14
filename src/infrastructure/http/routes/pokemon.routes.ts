import { Router } from 'express';
import { makePokemonController } from '@main/factories/makePokemonControler';
import { validate } from '@infrastructure/http/middlewares/validate.middleware';
import {
  createPokemonSchema,
  updatePokemonSchema,
  pokemonFilterSchema,
  pokemonIdParamSchema,
} from '@infrastructure/http/validations/pokemon.schema';

const pokeRoutes = Router();
const pokemonController = makePokemonController();

pokeRoutes.get(
  '/api/v1/pokemons',
  validate({ query: pokemonFilterSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Lista todos os Pokémons do catálogo'
      #swagger.description = 'Endpoint para listar os Pokémons cadastrados com suporte a filtros por tipo e nome.'
      #swagger.parameters['type'] = { in: 'query', type: 'string', description: 'Filtrar por tipo (ex: ELECTRIC)' }
      #swagger.parameters['name'] = { in: 'query', type: 'string', description: 'Filtrar por parte do nome' }
      #swagger.responses[200] = {
        description: 'Lista de Pokémons retornada com sucesso.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { $ref: '#/components/schemas/Pokemon' } }
          }
        }
      }
    */
    return pokemonController.list(req, res, next);
  },
);

pokeRoutes.get(
  '/api/v1/pokemons/:id',
  validate({ params: pokemonIdParamSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Busca um Pokémon pelo ID'
      #swagger.description = 'Endpoint para consultar um Pokémon cadastrado pelo seu ID.'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'ID do Pokémon' }
      #swagger.responses[200] = {
        description: 'Pokémon encontrado com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Pokemon' } } }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return pokemonController.getById(req, res, next);
  },
);

pokeRoutes.post(
  '/api/v1/pokemons',
  validate({ body: createPokemonSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Cria um novo Pokémon no catálogo'
      #swagger.description = 'Cadastra manualmente um Pokémon com tipos (enums) e atributos base.'
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/CreatePokemonDto' } }
        }
      }
      #swagger.responses[201] = {
        description: 'Pokémon criado com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Pokemon' } } }
      }
      #swagger.responses[400] = {
        description: 'Dados inválidos.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return pokemonController.create(req, res, next);
  },
);

pokeRoutes.put(
  '/api/v1/pokemons/:id',
  validate({ params: pokemonIdParamSchema, body: updatePokemonSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualiza um Pokémon pelo ID'
      #swagger.description = 'Atualiza dados de um Pokémon já existente no catálogo.'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/UpdatePokemonDto' } }
        }
      }
      #swagger.responses[200] = {
        description: 'Pokémon atualizado com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Pokemon' } } }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return pokemonController.update(req, res, next);
  },
);

pokeRoutes.delete(
  '/api/v1/pokemons/:id',
  validate({ params: pokemonIdParamSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Remove um Pokémon pelo ID'
      #swagger.description = 'Remove um Pokémon do catálogo.'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.responses[204] = { description: 'Pokémon removido com sucesso.' }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return pokemonController.delete(req, res, next);
  },
);

export { pokeRoutes };
