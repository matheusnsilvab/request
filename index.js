const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes')
const connectToDb = require('./database/db')
const providers = { users: [] }
const { graphql } = require('graphql')
const { ApolloServer, gql } = require('apollo-server');
const { Query } = require('mongoose')

const users = [
  { _id: String(Math.random()), name: 'Matheus1', email: 'matheus1@teste.com', active: true },
  { _id: String(Math.random()), name: 'Matheus2', email: 'matheus2@teste.com', active: false },
  { _id: String(Math.random()), name: 'Matheus3', email: 'matheus3@teste.com', active: true },
];

const resolvers = {
  Query: {
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    }
  }
};


const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
}
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
  users: [User!]!
  getUserByEmail(email: String!): User!
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
