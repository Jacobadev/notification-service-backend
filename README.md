# Sistema de Gerenciamento de Notificações

Este é um protótipo funcional de um Sistema de Gerenciamento de Notificações desenvolvido com NestJS, Prisma e TypeScript.

## Arquitetura e Estrutura do Projeto

O projeto segue uma arquitetura modular, onde cada funcionalidade principal (usuários, notificações, preferências, eventos) está contida em seu próprio módulo.

- `src/modules`: Contém os módulos da aplicação.
  - `users`: Gerenciamento de usuários.
  - `notifications`: Gerenciamento de notificações.
  - `preferences`: Gerenciamento das preferências de notificação dos usuários.
  - `events`: Simulação de eventos que disparam notificações.
  - `scheduler`: Tarefas agendadas para envio de resumos de notificações.
- `src/providers`: Contém serviços compartilhados.
  - `prisma`: Serviço para interação com o banco de dados através do Prisma.
  - `email`: Serviço para simulação de envio de e-mails.
- `prisma`: Contém o schema do banco de dados e as migrações.

## Principais Decisões Técnicas

- **NestJS**: Escolhido pela sua arquitetura modular e escalável, que facilita a organização do código e a separação de responsabilidades.
- **Prisma**: Utilizado como ORM pela sua facilidade de uso, tipagem segura e funcionalidades de migração.
- **@nestjs/schedule**: Usado para criar tarefas agendadas (Cron Jobs) para o envio de resumos diários e semanais de notificações, de forma simples e integrada ao ecossistema NestJS.
- **Simulação de E-mails**: Em vez de implementar um sistema de envio de e-mails real, um serviço mock foi criado para registrar os e-mails no console, atendendo aos requisitos do desafio.

## Instruções para Rodar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- npm

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd notification-system
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`, e configure a variável de ambiente:
   ```
   DATABASE_URL="file:./dev.db"
   ```

4. Aplique as migrações do banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

### Execução

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### Usuários

- `POST /users`: Cria um novo usuário.
  - Body: `{ "email": "user@example.com", "name": "User Name" }`
- `GET /users`: Retorna todos os usuários.
- `GET /users/:id`: Retorna um usuário específico.

### Eventos

- `POST /events`: Cria um novo evento, o que pode disparar notificações em tempo real.
  - Body: `{ "type": "NEW_AUDIT", "payload": {} }`
  - `EventType`: `NEW_AUDIT`, `DOCUMENT_UPDATED`, `REPORT_READY`

### Preferências

- `POST /preferences`: Cria uma nova preferência de notificação para um usuário.
  - Body: `{ "userId": "...", "eventType": "NEW_AUDIT", "channel": "EMAIL", "frequency": "REAL_TIME" }`
  - `Channel`: `IN_APP`, `EMAIL`
  - `Frequency`: `REAL_TIME`, `DAILY`, `WEEKLY`
- `GET /preferences/:userId`: Retorna todas as preferências de um usuário.
- `PATCH /preferences/:id`: Atualiza uma preferência.
  - Body: `{ "frequency": "DAILY" }`

### Notificações

- `GET /notifications/:userId`: Retorna todas as notificações de um usuário.
- `PATCH /notifications/:id/read`: Marca uma notificação como lida.

