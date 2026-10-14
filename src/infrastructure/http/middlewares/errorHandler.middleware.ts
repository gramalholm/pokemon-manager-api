import { Request, Response, NextFunction } from 'express';
import { AppError } from '@domain/errors/AppError';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response | void {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Falha na validação dos dados de entrada.',
      issues: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  console.error('[Unhandled Internal Error]:', error);
  return res.status(500).json({
    error: 'Ocorreu um erro interno no servidor.',
    message: error.message,
  });
}
