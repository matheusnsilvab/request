const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes')
const connectToDb = require('./database/db')
const providers = { users: [] }
const { graphql } = require('graphql')
const { ApolloServer, gql, UserInput } = require('apollo-server');
const { Query } = require('mongoose')
const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => User.findById(id),
    },
    Mutation: {
        createUser: (_, { data }) => User.create(data),
        updateUser: (_, { id, data }) => User.findOneAndUpdate(id, data, { new: true }),
        deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id)),
    }
};

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    active: Boolean!
}
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    active: Boolean
  }
  type Query {
  users: [User!]!
  user(id: ID!): User!
 }

 type Mutation {
    createUser(data: UserInput!): User!
    updateUser(id: ID, data: UserInput!): User!
    deleteUser(id: ID!): Boolean
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
