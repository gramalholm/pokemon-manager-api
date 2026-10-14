# PokéManager API 🎮

API RESTful desenvolvida em **Node.js**, **TypeScript** e **Clean Architecture** para gerenciamento de Treinadores Pokémon, catálogo de espécies com tipagem dupla via enums, integração com a **PokéAPI oficial** e persistência relacional com **Prisma ORM** e **PostgreSQL**.

---

## 📌 Etapa 2: Persistência Relacional, Validação Zod e Integração PokéAPI

### ✨ Novidades e Recursos Implementados nesta Etapa:
- **Estrutura Pokémon com Tipagem Dupla via Enums**: O modelo suporta `primaryType` (obrigatório) e `secondaryType` (opcional/nullable) baseados no enum `PokemonType` (com todos os 18 tipos oficiais de Pokémon).
- **Atributos de Estatísticas & BST**: HP, Ataque, Defesa, Velocidade e cálculo de *Base Stat Total (BST)* em nível de domínio.
- **Módulo de Treinadores e Captura**:
  - Cadastro de novos Treinadores (`POST /api/v1/trainers`).
  - Captura sincronizada com a PokéAPI oficial (`POST /api/v1/trainers/:trainerId/captures`), suportando apelidos (*nickname*), nível e chance de Pokémon *Shiny*.
  - **Regra de Negócio**: Treinadores não podem ultrapassar o limite máximo de **6 Pokémons** no time ativo.
  - Listagem do time do treinador (`GET /api/v1/trainers/:trainerId/team`).
- **Integração Externa PokéAPI**:
  - Interface `IPokeApiGateway` e implementação `AxiosPokeApiGateway` em `src/infrastructure/providers/pokeApiGateway.ts`.
  - Endpoint de busca direta: `GET /api/v1/pokedex/search?name=pikachu`.
- **Persistência Relacional com Prisma**:
  - `PrismaPokemonRepository`, `PrismaTrainerRepository` e `PrismaCaptureRepository` implementados sem alterar contratos do Domínio.
  - Repositórios In-Memory mantidos para testes unitários isolados e execução offline rápida.
- **Validação com Zod**:
  - Schemas rigorosos de validação para corpo da requisição (*body*), parâmetros de rota (*params*) e filtros (*query params*).
- **Tratamento Global de Erros**:
  - Classe base `AppError`, exceções customizadas de domínio (`NotFoundError`, `ConflictError`, `MaxTeamSizeError`, `PokeApiError`) e middleware centralizado `errorHandler`.
- **Documentação OpenAPI / Swagger**:
  - Rota interativa `/api/docs` atualizada com todos os novos schemas e rotas.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime & Linguagem**: Node.js (v20+) + TypeScript
- **Framework Web**: Express 5
- **ORM & Banco de Dados**: Prisma ORM + PostgreSQL
- **Integração HTTP Externa**: Axios (PokéAPI v2)
- **Validação de Schemas**: Zod
- **Documentação da API**: Swagger UI + OpenAPI 3.0 (`swagger-autogen`)
- **Qualidade de Código**: ESLint + Prettier

---

## 🚀 Como Executar o Projeto

### 1. Clonar e Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie o arquivo `.env` a partir do modelo:
```bash
cp .env.example .env
```
Exemplo de conteúdo do `.env`:
```env
PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pokemon_manager?schema=public"
```

> **Dica**: Caso deseje rodar a aplicação em modo de memória local (sem precisar de PostgreSQL ativo no momento):
> ```env
> USE_IN_MEMORY=true
> ```

### 3. Sincronizar o Banco de Dados com Prisma
```bash
npx prisma generate
npx prisma db push
```

### 4. Iniciar o Servidor
```bash
npm run dev
```

A API estará disponível em: `http://localhost:3333`  
Documentação interativa Swagger: `http://localhost:3333/api/docs`

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com `tsx watch` |
| `npm run build` | Compila o TypeScript para `dist` com verificação estrita de tipos |
| `npm run lint` | Executa o ESLint integrado ao Prettier |
| `npm run swagger` | Gera a especificação OpenAPI (`swagger-output.json`) |

---

## 📡 Endpoints da API

### 🧭 Pokédex (Integração Externa PokéAPI)
- `GET /api/v1/pokedex/search?name=pikachu` — Consulta dados oficiais diretamente na PokéAPI externa e retorna formatado.

### 👤 Treinadores & Capturas
- `POST /api/v1/trainers` — Cadastra um novo Treinador no banco de dados.
- `POST /api/v1/trainers/:trainerId/captures` — Captura um Pokémon para o time:
  - Busca imagem e atributos oficiais na PokéAPI.
  - Valida a regra de limite de **6 Pokémons** no time.
  - Salva a captura associada ao Treinador.
- `GET /api/v1/trainers/:trainerId/team` — Lista o time atual do Treinador (até 6 Pokémons).

### ⚡ Catálogo Local de Pokémons
- `GET /api/v1/pokemons` — Lista Pokémons cadastrados (suporte a filtros via `?type=ELECTRIC` e `?name=pika`).
- `GET /api/v1/pokemons/:id` — Busca um Pokémon por ID.
- `POST /api/v1/pokemons` — Cadastro manual no catálogo com validação de enums.
- `PUT /api/v1/pokemons/:id` — Atualização dos dados do Pokémon.
- `DELETE /api/v1/pokemons/:id` — Remoção do Pokémon do catálogo.

---

## 🏛️ Arquitetura do Projeto (Clean Architecture)

```text
src/
├── domain/                    # Regras de Negócio e Entidades
│   ├── entities/              # Pokemon, Trainer, Capture
│   ├── enums/                 # PokemonType enum e parsers
│   ├── errors/                # AppError, NotFoundError, MaxTeamSizeError, ConflictError, PokeApiError
│   └── repositories/          # Contratos IPokemonRepository, ITrainerRepository, ICaptureRepository
├── application/               # Casos de Uso e DTOs
│   ├── dtos/                  # DTOs tipados de entrada e saída
│   ├── gateways/              # Contrato IPokeApiGateway
│   └── use-cases/             # Casos de Uso (SearchPokeApi, CreateTrainer, CapturePokemon, GetTrainerTeam, etc.)
├── infrastructure/            # Implementações Concretas
│   ├── database/
│   │   ├── prisma/            # Prisma Client e Prisma Repositories
│   │   └── in-memory/         # Repositórios In-Memory (testes e fallback)
│   ├── http/
│   │   ├── controllers/       # Controllers Express
│   │   ├── middlewares/       # Validação Zod e errorHandler global
│   │   ├── routes/            # Definição das rotas REST
│   │   └── validations/       # Schemas Zod de validação
│   └── providers/             # AxiosPokeApiGateway (consumo da PokéAPI)
└── main/                      # Composição do Sistema
    ├── config/                # Configuração do Swagger e Servidor
    ├── factories/             # Injeção de dependências e instanciação dos use-cases
    └── server.ts              # Ponto de entrada da aplicação
```

---

## 👨‍💻 Autor

**Gabriel Ramalho Lima**  
Universidade Federal Fluminense (UFF)
