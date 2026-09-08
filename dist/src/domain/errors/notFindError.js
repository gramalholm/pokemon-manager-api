"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(id) {
        super(`Pokémon com id ${id} não encontrado`);
        this.name = 'PokemonNotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
