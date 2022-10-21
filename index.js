const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes')
const connectToDb = require('./database/db')
const providers = { users: [] }
const { graphql } = require('graphql')
const { ApolloServer, gql } = require('apollo-server');
const { Query } = require('mongoose')
const resolvers = {
  Query: {
    nome() {
      return 'Matheus Nunes'
    },
    idade() {
      return 23
    },
    ativo() {
      return true;
    },
    id() {
      return 1234567;
    }
  }
};

const typeDefs = gql`
type Query {
    nome: String
    idade: Int
    ativo: Boolean
    id: ID
  } 
`

const server = new ApolloServer({
  typeDefs,
  resolvers
});

connectToDb()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(routes)

server.listen()
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
