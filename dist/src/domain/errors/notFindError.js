"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AppError_1 = require("./AppError");
class NotFoundError extends AppError_1.AppError {
    constructor(identifier, resourceName = 'Pokémon') {
        super(`${resourceName} "${identifier}" não encontrado.`, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
