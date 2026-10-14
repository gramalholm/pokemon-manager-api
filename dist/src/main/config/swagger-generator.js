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
        version: '2.0.0',
        title: 'PokéManager API',
        description: 'API RESTful para gerenciamento de Treinadores e Pokémons, integrando PokéAPI, Clean Architecture, validação Zod e persistência Prisma.',
    },
    servers: [{ url: 'http://localhost:3333' }],
    tags: [
        {
            name: 'Pokemons',
            description: 'Endpoints de gerenciamento do catálogo de Pokémons',
        },
        {
            name: 'Trainers',
            description: 'Endpoints de cadastro e consulta de Treinadores',
        },
        { name: 'Captures', description: 'Endpoints de captura de Pokémons' },
        {
            name: 'Pokedex',
            description: 'Endpoints de consulta direta à PokéAPI oficial',
        },
    ],
    components: {
        schemas: {
            Pokemon: {
                type: 'object',
                required: ['id', 'name', 'primaryType', 'hp'],
                properties: {
                    id: { type: 'string', example: '25' },
                    name: { type: 'string', example: 'Pikachu' },
                    primaryType: { type: 'string', example: 'ELECTRIC' },
                    secondaryType: { type: 'string', nullable: true, example: null },
                    types: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['ELECTRIC'],
                    },
                    hp: { type: 'number', example: 35 },
                    attack: { type: 'number', example: 55 },
                    defense: { type: 'number', example: 40 },
                    speed: { type: 'number', example: 90 },
                    baseStatTotal: { type: 'number', example: 220 },
                    height: { type: 'number', example: 4 },
                    weight: { type: 'number', example: 60 },
                },
            },
            CreatePokemonDto: {
                type: 'object',
                required: ['id', 'name', 'hp'],
                properties: {
                    id: { type: 'string', example: '25' },
                    name: { type: 'string', example: 'Pikachu' },
                    primaryType: { type: 'string', example: 'ELECTRIC' },
                    secondaryType: { type: 'string', nullable: true, example: null },
                    type: { type: 'string', example: 'ELECTRIC' },
                    hp: { type: 'number', example: 35 },
                    attack: { type: 'number', example: 55 },
                    defense: { type: 'number', example: 40 },
                    speed: { type: 'number', example: 90 },
                },
            },
            UpdatePokemonDto: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Raichu' },
                    primaryType: { type: 'string', example: 'ELECTRIC' },
                    secondaryType: { type: 'string', nullable: true },
                    hp: { type: 'number', example: 60 },
                    attack: { type: 'number', example: 90 },
                    defense: { type: 'number', example: 55 },
                    speed: { type: 'number', example: 110 },
                },
            },
            Trainer: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'f3b8b1a2-3f1a-4c22-b5e1-9556819a695b',
                    },
                    name: { type: 'string', example: 'Ash Ketchum' },
                    email: { type: 'string', example: 'ash@pallet.com' },
                    region: { type: 'string', example: 'Kanto' },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            CreateTrainerDto: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                    name: { type: 'string', example: 'Ash Ketchum' },
                    email: { type: 'string', example: 'ash@pallet.com' },
                    region: { type: 'string', example: 'Kanto' },
                },
            },
            CapturePokemonDto: {
                type: 'object',
                required: ['pokemonName'],
                properties: {
                    pokemonName: { type: 'string', example: 'pikachu' },
                    nickname: { type: 'string', example: 'Sparky' },
                    level: { type: 'number', example: 5 },
                    isShiny: { type: 'boolean', example: false },
                },
            },
            CaptureResponse: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '9a8b7c6d-5e4f-3a2b-1c0d-e1f2a3b4c5d6',
                    },
                    trainerId: {
                        type: 'string',
                        example: 'f3b8b1a2-3f1a-4c22-b5e1-9556819a695b',
                    },
                    pokemonId: { type: 'string', example: '25' },
                    nickname: { type: 'string', example: 'Sparky' },
                    displayName: { type: 'string', example: 'Sparky' },
                    level: { type: 'number', example: 5 },
                    isShiny: { type: 'boolean', example: false },
                    capturedAt: { type: 'string', format: 'date-time' },
                    pokemon: { $ref: '#/components/schemas/Pokemon' },
                },
            },
            TrainerTeamResponse: {
                type: 'object',
                properties: {
                    trainer: { $ref: '#/components/schemas/Trainer' },
                    teamCount: { type: 'number', example: 1 },
                    maxTeamSize: { type: 'number', example: 6 },
                    team: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/CaptureResponse' },
                    },
                },
            },
            PokedexSearchResponse: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '25' },
                    name: { type: 'string', example: 'pikachu' },
                    primaryType: { type: 'string', example: 'ELECTRIC' },
                    secondaryType: { type: 'string', nullable: true, example: null },
                    types: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['ELECTRIC'],
                    },
                    hp: { type: 'number', example: 35 },
                    attack: { type: 'number', example: 55 },
                    defense: { type: 'number', example: 40 },
                    speed: { type: 'number', example: 90 },
                    height: { type: 'number', example: 4 },
                    weight: { type: 'number', example: 60 },
                },
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Mensagem descritiva do erro' },
                    issues: { type: 'array', items: { type: 'object' } },
                },
            },
        },
    },
};
const outputFile = path_1.default.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [
    path_1.default.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
    path_1.default.resolve(__dirname, '../../infrastructure/http/routes/trainer.routes.ts'),
    path_1.default.resolve(__dirname, '../../infrastructure/http/routes/pokedex.routes.ts'),
];
const schemas = JSON.parse(JSON.stringify(doc.components.schemas));
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
    const swaggerDocument = JSON.parse(fs_1.default.readFileSync(outputFile, 'utf8'));
    swaggerDocument.components.schemas = schemas;
    fs_1.default.writeFileSync(outputFile, JSON.stringify(swaggerDocument, null, 2));
    console.log('✅ Swagger JSON gerado com sucesso!');
});
