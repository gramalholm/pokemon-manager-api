"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePokemonUseCase = void 0;
const pokemon_1 = require("@domain/entities/pokemon");
const NotFoundError_1 = require("@domain/errors/NotFoundError");
class UpdatePokemonUseCase {
    pokeRepository;
    constructor(pokeRepository) {
        this.pokeRepository = pokeRepository;
    }
    async execute(id, updt_data) {
        const pokemon = await this.pokeRepository.findById(id);
        if (!pokemon) {
            throw new NotFoundError_1.NotFoundError(id, 'Pokémon');
        }
        const updated_pokemon = new pokemon_1.Pokemon({
            id: pokemon.id,
            name: updt_data.name ?? pokemon.name,
            primaryType: updt_data.primaryType ?? pokemon.primaryType,
            secondaryType: updt_data.secondaryType !== undefined
                ? updt_data.secondaryType
                : pokemon.secondaryType,
            type: updt_data.type,
            hp: updt_data.hp ?? pokemon.hp,
            attack: updt_data.attack ?? pokemon.attack,
            defense: updt_data.defense ?? pokemon.defense,
            speed: updt_data.speed ?? pokemon.speed,
            height: updt_data.height !== undefined ? updt_data.height : pokemon.height,
            weight: updt_data.weight !== undefined ? updt_data.weight : pokemon.weight,
        });
        await this.pokeRepository.update(updated_pokemon);
        return updated_pokemon;
    }
}
exports.UpdatePokemonUseCase = UpdatePokemonUseCase;
