import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor(identifier: string, resourceName = 'Pokémon') {
    super(`${resourceName} "${identifier}" não encontrado.`, 404);
    this.name = 'NotFoundError';
  }
}
