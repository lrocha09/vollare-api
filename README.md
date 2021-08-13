<h3 align="center">
   Vollare API
</h3>

<p align="center">Gerência e solicitação de serviços</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lrocha09/vollare-api?color=00CC00">

  <a href="https://github.com/lrocha09" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-lucas%20rocha-00CC00">
  </a>

  
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/lrocha09/vollare-api?color=00CC00">

  <a href="https://github.com/lrocha09/vollare-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lrocha09/vollare-api?color=00CC00">
  </a>
  

  <a href="https://github.com/lrocha09/vollare-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lrocha09/vollare-api?color=00CC00">
  </a>

</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-iniciando-o-projeto">Iniciando o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## Sobre o projeto

A equipe do projeto Vollare com o intuito de gerir clientes que querem fazer solicitação de serviços, resolveu disponibilizar uma API REST para consumo publico. A API deverá contemplar o cadastro de clientes, onde serão solicitados alguns dados pessoais, e também o cadastro de serviços.

## Tecnologias

Tecnologias utilizadas para o desenvolvimeno da API:

-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Mongoose](https://mongoosejs.com/)
-   [MongoDB](https://www.mongodb.com/pt-br)
-   [JWT-token](https://jwt.io/)
-   [Restify](http://restify.com/)
-   [Jest](https://jestjs.io/)
-   [Postman](https://www.postman.com/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)

## Iniciando o projeto

Abaixo contém o link para acessar a documentação da API:

[Vollare API Docs](https://documenter.getpostman.com/view/16998986/Tzz7NHZm)

### Requisitos

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
-   Ter o [MongoDB](https://www.mongodb.com/pt-br) instalado em sua máquina

> Obs.: Recomendado utilizar o docker, as configurações para conexão com o banco e dados estão no arquivo `.env`

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/lrocha09/vollare-api.git && vollare-api
```

**Siga os passos abaixo**

```bash
# Instale as dependências:
$ yarn

# Crie um container do MongoDB usando docker:
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Execute os testes da API:
$ yarn test

# Por fim, inicie o servidor da API:
$ yarn dev:server

# Muito bem, o projeto foi iniciado e pronto para ser utilizado!
```

## Licença

Este projeto está licenciado sob a Licença MIT - Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

Projeto Desenvolvido por Lucas Rocha.
