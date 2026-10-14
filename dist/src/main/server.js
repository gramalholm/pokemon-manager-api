"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const pokemon_routes_1 = require("@infrastructure/http/routes/pokemon.routes");
const trainer_routes_1 = require("@infrastructure/http/routes/trainer.routes");
const pokedex_routes_1 = require("@infrastructure/http/routes/pokedex.routes");
const errorHandler_middleware_1 = require("@infrastructure/http/middlewares/errorHandler.middleware");
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// Rotas da aplicação
app.use(pokemon_routes_1.pokeRoutes);
app.use(trainer_routes_1.trainerRoutes);
app.use(pokedex_routes_1.pokedexRoutes);
// Documentação Swagger
(0, swagger_1.setupSwagger)(app);
// Middleware global de tratamento de erros
app.use(errorHandler_middleware_1.errorHandler);
const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api/docs`);
});
