import express from 'express';
import { pokeRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());
app.use(pokeRoutes);
setupSwagger(app);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
