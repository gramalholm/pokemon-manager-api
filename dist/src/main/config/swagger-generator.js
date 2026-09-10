"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
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
const outputFile = path_1.default.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [
    path_1.default.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
];
const schemas = JSON.parse(JSON.stringify(doc.components.schemas));
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
    const swaggerDocument = JSON.parse(fs_1.default.readFileSync(outputFile, 'utf8'));
    swaggerDocument.components.schemas = schemas;
    fs_1.default.writeFileSync(outputFile, JSON.stringify(swaggerDocument, null, 2));
});
