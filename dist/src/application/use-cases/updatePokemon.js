"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePokemonUseCase = void 0;
const pokemon_1 = require("@domain/entities/pokemon");
const notFindError_1 = require("@domain/errors/notFindError");
class UpdatePokemonUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(id, updt_data) {
        let pokemon;
        if (!(pokemon = await this.pokeRepository.findById(id))) {
            throw new notFindError_1.NotFoundError(id);
        }
        const updated_pokemon = new pokemon_1.Pokemon({
            id: pokemon.id,
            name: updt_data.name ?? pokemon.name,
            type: updt_data.type ?? pokemon.type,
            hp: pokemon.hp
        });
        await this.pokeRepository.update(updated_pokemon);
        return updated_pokemon;
    }
}
exports.UpdatePokemonUseCase = UpdatePokemonUseCase;
