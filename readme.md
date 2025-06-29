# 📚 API de Gestão de Cursos e Inscrições

Este projeto é uma API RESTful desenvolvida com Node.js e Express, utilizando Sequelize como ORM para interagir com um banco de dados relacional. A API permite gerenciar usuários, cursos e inscrições em cursos, com autenticação JWT e rotas bem definidas.

## 🚀 Funcionalidades

A API oferece as seguintes funcionalidades principais:

1.  **Criação de Conta de Usuário:** Cadastro de novos usuários com dados essenciais, incluindo data de nascimento.
2.  **Autenticação de Usuário (Login):** Permite que usuários existentes façam login e recebam um token JWT para acesso seguro.
3.  **Listagem de Cursos:** Consulta de todos os cursos disponíveis, com a opção de filtro por nome ou descrição. Exige autenticação.
4.  **Inscrição em Cursos:** Permite que usuários autenticados se inscrevam em cursos.
5.  **Cancelamento de Inscrição:** Permite que usuários autenticados cancelem suas inscrições em cursos.
6.  **Listagem de Cursos Inscritos:** Permite que um usuário autenticado visualize a lista de cursos em que está (ou esteve) inscrito.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js.
* **Sequelize:** ORM (Object-Relational Mapper) para Node.js, facilitando a interação com o banco de dados.
* **SQLite:** Banco de dados relacional leve (usado nas configurações de desenvolvimento, pode ser alterado para PostgreSQL, MySQL, etc.).
* **JWT (JSON Web Tokens):** Para autenticação e autorização seguras.
* **Bcrypt:** Para hash de senhas.
* **Moment.js:** Para manipulação e formatação de datas.
* **Dotenv:** Para carregar variáveis de ambiente.
* **Cookie-parser:** Middleware para lidar com cookies.
* **CORS:** Configurado para permitir requisições de frontend.

## 📁 Estrutura do Projeto

A estrutura de pastas do projeto é organizada da seguinte forma:

.
├── config/
│   └── database.js         # Configuração do Sequelize e conexão com o banco de dados
├── src/
│   ├── controllers/        # Lógica de negócio das requisições HTTP
│   │   ├── curso.controller.js
│   │   ├── inscricao.controller.js
│   │   └── usuario.controller.js
│   ├── middlewares/        # Funções intermediárias (ex: autenticação)
│   │   └── auth.middleware.js
│   ├── models/             # Definição dos modelos (tabelas) do banco de dados
│   │   ├── Curso.js
│   │   ├── Inscricao.js
│   │   ├── Usuario.js
│   │   └── relacionamentos.js # Definição das associações entre os modelos
│   ├── routes/             # Definição das rotas da API
│   │   ├── auth.routes.js
│   │   ├── curso.routes.js
│   │   ├── root.routes.js
│   │   └── usuario.routes.js
│   └── services/           # Lógica de negócio principal, separada dos controllers
│       ├── curso.service.js
│       ├── inscricao.service.js
│       └── usuario.service.js
├── .env                    # Variáveis de ambiente
├── .gitignore              # Arquivos e pastas a serem ignorados pelo Git
├── index.js                # Ponto de entrada da aplicação
├── package.json            # Dependências do projeto e scripts
├── README.md               # Este arquivo
└── sync.js                 # Script para sincronizar (criar/atualizar) o banco de dados

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

### Pré-requisitos

* Node.js (versão 14 ou superior)
* npm (gerenciador de pacotes do Node.js) ou Yarn

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo `.env.example` para `.env` na raiz do projeto e preencha as variáveis.

    ```bash
    cp .env.example .env
    ```

    **Conteúdo esperado para `.env`:**
    ```
    PORT=3000
    JWT_SECRET=sua_chave_secreta_jwt_aqui # Use uma string longa e aleatória
    DATABASE_URL=sqlite://./database.sqlite # Ou a URL do seu banco de dados (ex: PostgreSQL, MySQL)
    NODE_ENV=development # production, development, test
    ```
    * `JWT_SECRET`: Uma string secreta forte e única.
    * `DATABASE_URL`: A URL de conexão com seu banco de dados. Para SQLite, `sqlite://./database.sqlite` criará um arquivo `database.sqlite` na raiz do projeto.

4.  **Sincronize o banco de dados:**
    Este comando criará as tabelas no seu banco de dados com base nos modelos definidos. **CUIDADO:** Se você usar `{ force: true }` no `sync.js`, ele apagará os dados existentes!

    ```bash
    node sync.js
    ```
    Após a execução, ele fechará a conexão. Você pode remover o `sequelize.close()` ou o `{ force: true }` de `sync.js` após a primeira execução se desejar manter os dados.

5.  **Inicie o servidor:**
    ```bash
    npm start
    # ou
    node index.js
    ```
    O servidor estará rodando na porta especificada no seu `.env` (padrão: `3000`).

## 🗺️ Rotas da API

A seguir, estão as principais rotas da API com seus métodos HTTP, URLs, requisitos de autenticação e detalhes de requisição/resposta.

### 1. Autenticação e Usuários

* **Criar Conta (Cadastrar Usuário)**
    * `POST /usuarios`
    * **Autenticação:** Nenhuma
    * **Requisição (JSON Body):**
        ```json
        {
            "nome": "Nome do Usuário",
            "email": "email@example.com",
            "senha": "senhaSegura123",
            "nascimento": "01/01/1990"
        }
        ```
    * **Respostas:**
        * `200 OK`: `{"nome": "Nome do Usuário", "email": "email@example.com", "nascimento": "01/01/1990"}`
        * `400 Bad Request`: `{"mensagem": "Email já cadastrado"}` ou `{"mensagem": "Data de nascimento inválida. Use o formato DD/MM/YYYY"}`
        * `500 Internal Server Error`: `{"mensagem": "Erro interno do servidor ao cadastrar usuário."}`

* **Login de Usuário**
    * `POST /login`
    * **Autenticação:** Nenhuma
    * **Requisição (JSON Body):**
        ```json
        {
            "email": "email@example.com",
            "senha": "senhaSegura123"
        }
        ```
    * **Respostas:**
        * `200 OK`: `{"token": "eyJhbGciOiJIUzI1Ni..."}` (o token também é setado em um cookie `httpOnly`)
        * `401 Unauthorized`: `{"mensagem": "Credenciais inválidas"}`
        * `500 Internal Server Error`: `{"mensagem": "Erro interno do servidor ao realizar login."}`

* **Listar Cursos Inscritos por Usuário**
    * `GET /usuarios/:idUsuario/cursos-inscritos`
    * **Autenticação:** JWT Obrigatório
    * **Parâmetros de URL:** `:idUsuario` (ID do usuário)
    * **Respostas:**
        * `200 OK`: `[ { "id": 1, "nome": "Curso X", "descricao": "...", "capa": "...", "total_inscricoes": 5, "inicio": "DD/MM/YYYY", "inscricao_cancelada": false, "inscrito": true } ]`
        * `403 Forbidden`: `{"mensagem": "Token não fornecido!"}` ou `{"mensagem": "Não autorizado a ver inscrições de outro usuário!"}`
        * `401 Unauthorized`: `{"mensagem": "Token Invalido!"}`
        * `500 Internal Server Error`: `{"mensagem": "Erro ao buscar cursos inscritos: ..."}`

### 2. Cursos

* **Listar Todos os Cursos**
    * `GET /cursos`
    * **Autenticação:** JWT Obrigatório
    * **Query Parameters (Opcional):** `filtro` (string para buscar por nome ou descrição)
        * Ex: `/cursos?filtro=javascript`
    * **Respostas:**
        * `200 OK`: `[ { "id": 1, "nome": "Curso de Node.js", "descricao": "...", "capa": "...", "inscricoes": 10, "inicio": "DD/MM/YYYY", "inscrito": true/false } ]`
        * `403 Forbidden`: `{"mensagem": "Token não fornecido!"}`
        * `401 Unauthorized`: `{"mensagem": "Token Invalido!"}`
        * `500 Internal Server Error`: `{"mensagem": "Erro ao buscar cursos: ..."}`

* **Inscrever-se em um Curso**
    * `POST /cursos/:idCurso/inscrever`
    * **Autenticação:** JWT Obrigatório
    * **Parâmetros de URL:** `:idCurso` (ID do curso)
    * **Requisição:** Vazia
    * **Respostas:**
        * `200 OK`: `{"mensagem": "Inscrição realizada com sucesso"}`
        * `403 Forbidden`: `{"mensagem": "Token não fornecido!"}`
        * `401 Unauthorized`: `{"mensagem": "Token Invalido!"}`
        * `404 Not Found`: `{"mensagem": "Curso não encontrado!"}`
        * `400 Bad Request`: `{"mensagem": "Usuário já inscrito neste curso!"}`

* **Cancelar Inscrição em um Curso**
    * `PATCH /cursos/:idCurso/cancelar`
    * **Autenticação:** JWT Obrigatório
    * **Parâmetros de URL:** `:idCurso` (ID do curso)
    * **Requisição:** Vazia
    * **Respostas:**
        * `200 OK`: `{"mensagem": "Inscrição cancelada com sucesso!"}`
        * `403 Forbidden`: `{"mensagem": "Token não fornecido!"}`
        * `401 Unauthorized`: `{"mensagem": "Token Invalido!"}`
        * `404 Not Found`: `{"mensagem": "Inscrição não encontrada ou já cancelada."}`
        * `400 Bad Request`: `{"mensagem": "Erro ao cancelar inscrição."}`

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e commit-as (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Envie para o branch original (`git push origin feature/sua-feature`).
5.  Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
