# airbnb-clone
Projeto clone do airbnb com React.js e Adonis.js

## Configurando banco de dados
Para configurar o banco de dados acesse o diretório `backend` e procure o arquivo `.env.example`
e renomeie para apenas `.env` e altere as informações de acordo com o banco de dados que esteja
usando, no caso de PostgreSQL, altere as seguintes informações:
```
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=db_airbnb
```
**Vale apena resaltar que informações citada anteriormente atende apenas meu ambiente e que as informações
citada anteriormente pode diferir em seu ambiente**


Outro passo importante é criar um banco de dados de acordo com o nome da configuração `DB_DATABASE`


## Dependencias
Para instalar as dependencias do backend, acesse o diretório `backend` e execute:
```
yarn install
```
ou
```
npm install
```

Para instalar as dependências do frontend, acesse o diretório `frontend` e execute:
```
yarn install
```
ou
```
npm install
```

## Rodando projeto
Acesse o `backend` e execute:
```
adonis serve --dev
```

Acesse o `frontend` e execute:
```
yarn start
```
