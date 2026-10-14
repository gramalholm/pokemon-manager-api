import { Request, Response, NextFunction } from 'express';
import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonUseCase } from '@application/use-cases/listPokemon';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';

export class PokemonController {
  constructor(
    private createPokemon: CreatePokemonUseCase,
    private deletePokemon: DeletePokemonUseCase,
    private getPokemonById: GetPokemonByIdUseCase,
    private listPokemons: ListPokemonUseCase,
    private updatePokemon: UpdatePokemonUseCase,
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const createdPokemon = await this.createPokemon.execute(req.body);
      res.status(201).json(createdPokemon.toJSON());
    } catch (error) {
      next(error);
    }
  };

  list = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { type, name } = req.query as { type?: string; name?: string };
      const pokemons = await this.listPokemons.execute({ type, name });
      res.status(200).json(pokemons.map((p) => p.toJSON()));
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const pokemon = await this.getPokemonById.execute(id);
      res.status(200).json(pokemon.toJSON());
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const pokemon = await this.updatePokemon.execute(id, req.body);
      res.status(200).json(pokemon.toJSON());
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      await this.deletePokemon.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
