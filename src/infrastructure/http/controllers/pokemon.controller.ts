import { Request, Response } from 'express';
import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonUseCase } from '@application/use-cases/listPokemon';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';
import { PokemonProps } from '@domain/entities/pokemon';
import { NotFoundError } from '@domain/errors/NotFindError';

type PokemonParams = {
    id: string;
};

// Nas proximas etapas implementar middlewares de tratamento de erro para evitar esse try-catch chato
export class PokemonController{
    constructor(
        private createPokemon: CreatePokemonUseCase,
        private deletePokemon: DeletePokemonUseCase,
        private getPokemonById: GetPokemonByIdUseCase,
        private listPokemons: ListPokemonUseCase,
        private updatePokemon: UpdatePokemonUseCase
    ){}

    create = async(req: Request, res: Response): Promise<Response> => {
        try {
            const { id, name, type, hp } = req.body;

            if (!id || !name || !type || hp === undefined) {
                return res.status(400).json({ 
                    error: "Dados inválidos. Envie id, name, type e hp." 
                });
            };

            const pokeData: PokemonProps = {
                id,
                name,
                type,
                hp
            };
            
            const created_pokemon = await this.createPokemon.execute(pokeData);

            return res.status(201).json(created_pokemon);
        } catch(error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    list = async(req: Request, res: Response): Promise<Response> => {
        try {
            const poke_list = await this.listPokemons.execute();
            return res.status(200).json(poke_list);
        } catch(error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    update = async(req: Request<PokemonParams>, res: Response): Promise<Response> => {
        try {
            const { name, type } = req.body;

            const updtPoke: UpdatePokemonDTO = {
                name,
                type,
            };

            const pokemon = await this.updatePokemon.execute(
                req.params.id,
                updtPoke,
            );

            return res.status(200).json(pokemon);
        } catch(error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
    // Esse pokeParams eu tive que criar pq por algum motivo o req.params.id estava dando erro sozinho
    delete = async(req: Request<PokemonParams>, res: Response): Promise<Response> => {
        try {
            await this.deletePokemon.execute(req.params.id);
            return res.status(204).send();
        } catch (err) {
            if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
                throw err;
        }
    }

    getById = async(req: Request<PokemonParams>, res: Response): Promise<Response> => {
        try{
            const { id } = req.params;
            const pokemon = await this.getPokemonById.execute(id);
            return res.status(200).json(pokemon);
        }catch(error: any){
            return res.status(400).json({ error: error.message });
        }
    }
}