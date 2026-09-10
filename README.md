# Pokemon Manager API

API REST para cadastro e gerenciamento de Pokémons, desenvolvida em Node.js e TypeScript com uma organização inspirada em Clean Architecture.

## Status

O projeto está em desenvolvimento. Atualmente, os dados são armazenados em memória e são perdidos quando o servidor é reiniciado. A integração com PostgreSQL está prevista para uma etapa futura.

## Tecnologias

- Node.js
- TypeScript
- Express 5
- Swagger UI e OpenAPI
- ESLint e Prettier

## Requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Executando o projeto

Servidor em modo de desenvolvimento, com reinício automático:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3333`.

Para gerar a documentação OpenAPI:

```bash
npm run swagger
```

A documentação interativa fica em:

`http://localhost:3333/api/docs`

## Scripts

| Comando           | Descrição                               |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Inicia o servidor com `tsx watch`       |
| `npm run build`   | Compila o TypeScript para `dist`        |
| `npm run lint`    | Verifica o código com ESLint e Prettier |
| `npm run swagger` | Gera o arquivo `swagger-output.json`    |

## Endpoints

### Listar Pokémons

```http
GET /api/v1/pokemons
```

### Buscar por ID

```http
GET /api/v1/pokemons/:id
```

### Criar um Pokémon

```http
POST /api/v1/pokemons
Content-Type: application/json
```

```json
{
  "id": "25",
  "name": "Pikachu",
  "type": "Electric",
  "hp": 35
}
```

### Atualizar um Pokémon

```http
PUT /api/v1/pokemons/:id
Content-Type: application/json
```

```json
{
  "name": "Raichu",
  "type": "Electric"
}
```

### Remover um Pokémon

```http
DELETE /api/v1/pokemons/:id
```

## Respostas HTTP principais

- `200 OK`: consulta ou atualização concluída.
- `201 Created`: Pokémon criado.
- `204 No Content`: Pokémon removido.
- `400 Bad Request`: dados inválidos.
- `404 Not Found`: Pokémon não encontrado.

## Estrutura do projeto

```text
src/
├── application/       # DTOs e casos de uso
├── domain/            # Entidades, erros e contratos de repositório
├── infrastructure/    # HTTP e persistência em memória
└── main/              # Inicialização, configuração e factories
```

## Validação local

Antes de enviar alterações, execute:

```bash
npm run lint
npm run build
```

## Autor

Gabriel Ramalho Lima
