import fs from 'fs';
import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pokemon Manager API',
    description: 'API RESTful para gerenciamento de um catálogo de Pokémons, construída com Clean Architecture.',
  },
  servers: [{ url: 'http://localhost:3333' }],
  tags: [
    { name: 'Pokemons', description: 'Endpoints de gerenciamento de Pokémons' },
  ],
  components: {
    schemas: {
      Pokemon: {
        type: 'object',
        required: ['id', 'name', 'type', 'hp'],
        properties: {
          id: { type: 'string', example: '1' },
          name: { type: 'string', example: 'Pikachu' },
          type: { type: 'string', example: 'Electric' },
          hp: { type: 'number', example: 35 },
        },
      },
      CreatePokemonDto: {
        type: 'object',
        required: ['id', 'name', 'type', 'hp'],
        properties: {
          id: { type: 'string', example: '1' },
          name: { type: 'string', example: 'Pikachu' },
          type: { type: 'string', example: 'Electric' },
          hp: { type: 'number', example: 35 },
        },
      },
      UpdatePokemonDto: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Raichu' },
          type: { type: 'string', example: 'Electric' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Pokémon não encontrado' },
        },
      },
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
];
const schemas = JSON.parse(JSON.stringify(doc.components.schemas));

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  const swaggerDocument = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

  swaggerDocument.components.schemas = schemas;

  fs.writeFileSync(outputFile, JSON.stringify(swaggerDocument, null, 2));
});