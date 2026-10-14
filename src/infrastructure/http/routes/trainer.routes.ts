import { Router } from 'express';
import { makeTrainerController } from '@main/factories/makeTrainerController';
import { validate } from '@infrastructure/http/middlewares/validate.middleware';
import {
  createTrainerSchema,
  trainerIdParamSchema,
  capturePokemonSchema,
} from '@infrastructure/http/validations/trainer.schema';

const trainerRoutes = Router();
const trainerController = makeTrainerController();

trainerRoutes.post(
  '/api/v1/trainers',
  validate({ body: createTrainerSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Cadastro de novos Treinadores'
      #swagger.description = 'Cadastra um novo Treinador no banco de dados.'
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/CreateTrainerDto' } }
        }
      }
      #swagger.responses[201] = {
        description: 'Treinador criado com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Trainer' } } }
      }
      #swagger.responses[400] = {
        description: 'Dados inválidos.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
      #swagger.responses[409] = {
        description: 'Email já cadastrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return trainerController.create(req, res, next);
  },
);

trainerRoutes.post(
  '/api/v1/trainers/:trainerId/captures',
  validate({ params: trainerIdParamSchema, body: capturePokemonSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Captures']
      #swagger.summary = 'Captura de Pokémon para o time do Treinador'
      #swagger.description = 'Consulta a PokéAPI oficial, valida a regra de no máximo 6 Pokémons no time e salva a captura no banco de dados.'
      #swagger.parameters['trainerId'] = { in: 'path', required: true, type: 'string', description: 'ID do Treinador' }
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/CapturePokemonDto' } }
        }
      }
      #swagger.responses[201] = {
        description: 'Pokémon capturado com sucesso!',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CaptureResponse' } } }
      }
      #swagger.responses[400] = {
        description: 'Limite de 6 Pokémons excedido ou dados inválidos.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
      #swagger.responses[404] = {
        description: 'Treinador ou Pokémon não encontrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return trainerController.capture(req, res, next);
  },
);

trainerRoutes.get(
  '/api/v1/trainers/:trainerId/team',
  validate({ params: trainerIdParamSchema }),
  (req, res, next) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Lista o time atual do treinador'
      #swagger.description = 'Retorna os Pokémons capturados pelo treinador (até 6 no time ativo).'
      #swagger.parameters['trainerId'] = { in: 'path', required: true, type: 'string', description: 'ID do Treinador' }
      #swagger.responses[200] = {
        description: 'Time do treinador retornado com sucesso.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/TrainerTeamResponse' } } }
      }
      #swagger.responses[404] = {
        description: 'Treinador não encontrado.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return trainerController.getTeam(req, res, next);
  },
);

export { trainerRoutes };
