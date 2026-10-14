import { Request, Response, NextFunction } from 'express';
import { SearchPokeApiUseCase } from '@application/use-cases/searchPokeApi';

export class PokedexController {
  constructor(private searchPokeApi: SearchPokeApiUseCase) {}

  search = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name } = req.query as { name: string };
      const pokemon = await this.searchPokeApi.execute(name);
      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  };
}
