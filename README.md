# Finance App API

Uma API RESTful robusta para gerenciamento financeiro pessoal, permitindo que os usuários acompanhem seus ganhos, despesas e investimentos. Desenvolvida com foco em Clean Architecture e boas práticas de engenharia de software.

> **Deploy:** A aplicação está implantada e acessível na plataforma [Render](https://render.com/).

## 🚀 Funcionalidades

- **Gerenciamento de Usuários:**
  - Cadastro de usuários
  - Autenticação via JWT (Login)
  - Proteção de rotas privadas

- **Gerenciamento de Transações:**
  - Criação de transações (Ganhos, Despesas, Investimentos)
  - Listagem de transações do usuário
  - Atualização e remoção de transações
  - Filtragem e detalhamento

- **Documentação:**
  - Interface interativa via Swagger UI

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** (v20+) & **Express**
- **PostgreSQL** (Banco de dados relacional)
- **Prisma ORM** (Interação com o banco de dados)
- **Zod** (Validação de schemas)
- **JWT** (JSON Web Token para autenticação)
- **Bcrypt** (Criptografia de senhas)
- **Jest** (Testes unitários e E2E)
- **Docker** (Containerização - opcional para desenvolvimento)

## 🏗️ Arquitetura

O projeto segue princípios de **Clean Architecture**, organizando o código em camadas para garantir desacoplamento e testabilidade:

- **Adapters:** Camada de adaptação para frameworks e bibliotecas externas.
- **Controllers:** Manipuladores de requisições HTTP.
- **Use Cases:** Regras de negócio da aplicação.
- **Repositories:** Abstração para acesso a dados.
- **Factories:** Criação de instâncias complexas (Injeção de Dependência).

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js
- PostgreSQL
- NPM ou Yarn

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/andressouza25/finance-app-api.git
   cd finance-app-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` baseado no exemplo (se houver) e configure as variáveis:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/finance_db"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor:**
   ```bash
   npm run start:dev
   ```

A API estará rodando em `http://localhost:3000`.

## 📚 Documentação da API

A documentação completa dos endpoints está disponível através do Swagger UI. Após iniciar a aplicação, acesse:

```
http://localhost:3000/docs
```

## 🧪 Testes

Para executar os testes automatizados:

```bash
# Testes unitários e integração
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

## 📝 Scripts Disponíveis

- `npm start`: Inicia a aplicação em produção.
- `npm run start:dev`: Inicia em modo de desenvolvimento com hot-reload.
- `npm run eslint:check`: Verifica problemas de linting.
- `npm run prettier:check`: Verifica formatação de código.
