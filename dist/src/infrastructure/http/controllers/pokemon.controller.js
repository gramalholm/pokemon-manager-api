"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
class PokemonController {
    createPokemon;
    deletePokemon;
    getPokemonById;
    listPokemons;
    updatePokemon;
    constructor(createPokemon, deletePokemon, getPokemonById, listPokemons, updatePokemon) {
        this.createPokemon = createPokemon;
        this.deletePokemon = deletePokemon;
        this.getPokemonById = getPokemonById;
        this.listPokemons = listPokemons;
        this.updatePokemon = updatePokemon;
    }
    create = async (req, res, next) => {
        try {
            const createdPokemon = await this.createPokemon.execute(req.body);
            res.status(201).json(createdPokemon.toJSON());
        }
        catch (error) {
            next(error);
        }
    };
    list = async (req, res, next) => {
        try {
            const { type, name } = req.query;
            const pokemons = await this.listPokemons.execute({ type, name });
            res.status(200).json(pokemons.map((p) => p.toJSON()));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const pokemon = await this.getPokemonById.execute(id);
            res.status(200).json(pokemon.toJSON());
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const pokemon = await this.updatePokemon.execute(id, req.body);
            res.status(200).json(pokemon.toJSON());
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.deletePokemon.execute(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.PokemonController = PokemonController;
