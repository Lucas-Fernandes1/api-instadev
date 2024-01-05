Documentação da API
Rota /user
Criar usuário
Método: POST

Endpoint: /user

Descrição: Cria um novo usuário.

Parâmetros:

nome: (string) Nome do usuário.
email: (string) Endereço de e-mail do usuário.
senha: (string) Senha do usuário.
Exemplo de requisição:

json
Copy code
POST /user
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senhadousuario"
}
Resposta de sucesso:

json
Copy code
{
  "mensagem": "Usuário criado com sucesso",
  "id": 123,
  "nome": "Nome do Usuário",
  "email": "usuario@email.com"
}
Obter informações do usuário
Método: GET

Endpoint: /user/{id}

Descrição: Obtém informações do usuário pelo ID.

Parâmetros:

id: (int) ID do usuário.
Exemplo de requisição:

json
Copy code
GET /user/123
Resposta de sucesso:

json
Copy code
{
  "id": 123,
  "nome": "Nome do Usuário",
  "email": "usuario@email.com"
}
Rota /auth
Autenticação do usuário
Método: POST

Endpoint: /auth

Descrição: Autentica o usuário e fornece um token de acesso.

Parâmetros:

email: (string) Endereço de e-mail do usuário.
senha: (string) Senha do usuário.
Exemplo de requisição:

json
Copy code
POST /auth
{
  "email": "usuario@email.com",
  "senha": "senhadousuario"
}
Resposta de sucesso:

json
Copy code
{
  "token": "token_de_acesso"
}
