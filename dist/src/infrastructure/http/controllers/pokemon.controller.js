"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const NotFindError_1 = require("@domain/errors/NotFindError");
const getErrorMessage = (error) => error instanceof Error ? error.message : 'Erro interno.';
// Nas proximas etapas implementar middlewares de tratamento de erro para evitar esse try-catch chato
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
    create = async (req, res) => {
        try {
            const { id, name, type, hp } = req.body;
            if (!id || !name || !type || hp === undefined) {
                return res.status(400).json({
                    error: 'Dados inválidos. Envie id, name, type e hp.',
                });
            }
            const pokeData = {
                id,
                name,
                type,
                hp,
            };
            const created_pokemon = await this.createPokemon.execute(pokeData);
            return res.status(201).json(created_pokemon);
        }
        catch (error) {
            return res.status(400).json({ error: getErrorMessage(error) });
        }
    };
    list = async (req, res) => {
        try {
            const poke_list = await this.listPokemons.execute();
            return res.status(200).json(poke_list);
        }
        catch (error) {
            return res.status(400).json({ error: getErrorMessage(error) });
        }
    };
    update = async (req, res) => {
        try {
            const { name, type } = req.body;
            const updtPoke = {
                name,
                type,
            };
            const pokemon = await this.updatePokemon.execute(req.params.id, updtPoke);
            return res.status(200).json(pokemon);
        }
        catch (error) {
            return res.status(400).json({ error: getErrorMessage(error) });
        }
    };
    // Esse pokeParams eu tive que criar pq por algum motivo o req.params.id estava dando erro sozinho
    delete = async (req, res) => {
        try {
            await this.deletePokemon.execute(req.params.id);
            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof NotFindError_1.NotFoundError)
                return res.status(404).json({ message: err.message });
            throw err;
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const pokemon = await this.getPokemonById.execute(id);
            return res.status(200).json(pokemon);
        }
        catch (error) {
            if (error instanceof NotFindError_1.NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(400).json({ error: getErrorMessage(error) });
        }
    };
}
exports.PokemonController = PokemonController;
