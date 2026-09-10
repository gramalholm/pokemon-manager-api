import { Router } from 'express';
import { makePokemonController } from '@main/factories/makePokemonControler';

const pokeRoutes = Router();
const pokemonController = makePokemonController();

pokeRoutes.get('/api/v1/pokemons', (req, res) => {
  /*
            #swagger.tags = ['Pokemons']
            #swagger.summary = 'Lista todos os Pokémons'
            #swagger.description = 'Endpoint para listar os Pokémons cadastrados.'
            #swagger.responses[200] = {
                description: 'Lista de Pokémons retornada com sucesso.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Pokemon' }
                        }
                    }
                }
            }
        */
  return pokemonController.list(req, res);
});

pokeRoutes.get('/api/v1/pokemons/:id', (req, res) => {
  /*
            #swagger.tags = ['Pokemons']
            #swagger.summary = 'Busca um Pokémon pelo ID'
            #swagger.description = 'Endpoint para consultar um Pokémon cadastrado pelo seu ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                type: 'string',
                description: 'ID do Pokémon a ser consultado'
            }
            #swagger.responses[200] = {
                description: 'Pokémon encontrado com sucesso.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Pokemon' }
                    }
                }
            }
            #swagger.responses[404] = {
                description: 'Pokémon não encontrado.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ErrorResponse' }
                    }
                }
            }
        */
  return pokemonController.getById(req, res);
});

pokeRoutes.post('/api/v1/pokemons', (req, res) => {
  /*
            #swagger.tags = ['Pokemons']
            #swagger.summary = 'Cria um novo Pokémon'
            #swagger.description = 'Endpoint para cadastrar um novo Pokémon.'
            #swagger.requestBody = {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/CreatePokemonDto' }
                    }
                }
            }
            #swagger.responses[201] = {
                description: 'Pokémon criado com sucesso.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Pokemon' }
                    }
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ErrorResponse' }
                    }
                }
            }
        */
  return pokemonController.create(req, res);
});

pokeRoutes.put('/api/v1/pokemons/:id', (req, res) => {
  /*
            #swagger.tags = ['Pokemons']
            #swagger.summary = 'Atualiza um Pokémon pelo ID'
            #swagger.description = 'Endpoint para atualizar os dados de um Pokémon cadastrado.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                type: 'string',
                description: 'ID do Pokémon a ser atualizado'
            }
            #swagger.requestBody = {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UpdatePokemonDto' }
                    }
                }
            }
            #swagger.responses[200] = {
                description: 'Pokémon atualizado com sucesso.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Pokemon' }
                    }
                }
            }
            #swagger.responses[404] = {
                description: 'Pokémon não encontrado.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ErrorResponse' }
                    }
                }
            }
        */
  return pokemonController.update(req, res);
});

pokeRoutes.delete('/api/v1/pokemons/:id', (req, res) => {
  /*
            #swagger.tags = ['Pokemons']
            #swagger.summary = 'Remove um Pokémon pelo ID'
            #swagger.description = 'Endpoint para remover um Pokémon cadastrado.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                type: 'string',
                description: 'ID do Pokémon a ser removido'
            }
            #swagger.responses[204] = {
                description: 'Pokémon removido com sucesso.'
            }
            #swagger.responses[404] = {
                description: 'Pokémon não encontrado.',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ErrorResponse' }
                    }
                }
            }
        */
  return pokemonController.delete(req, res);
});

export { pokeRoutes };
