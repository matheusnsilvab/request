const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes')
const connectToDb = require('./database/db')
const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");
const server = new ApolloServer({
  ...graphql,
});

connectToDb()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(routes)

server.listen()
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
