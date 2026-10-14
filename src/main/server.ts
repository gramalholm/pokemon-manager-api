import 'dotenv/config';
import express from 'express';
import { pokeRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { trainerRoutes } from '@infrastructure/http/routes/trainer.routes';
import { pokedexRoutes } from '@infrastructure/http/routes/pokedex.routes';
import { errorHandler } from '@infrastructure/http/middlewares/errorHandler.middleware';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());

// Rotas da aplicação
app.use(pokeRoutes);
app.use(trainerRoutes);
app.use(pokedexRoutes);

// Documentação Swagger
setupSwagger(app);

// Middleware global de tratamento de erros
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `Documentação Swagger disponível em http://localhost:${PORT}/api/docs`,
  );
});

export { app };
