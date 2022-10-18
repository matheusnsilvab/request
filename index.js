const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes')
const resolvers = {
    user({ id }) {
        return providers.user.find(item => item.id === Number(id))
    },
    users() {
        return providers.user
    },
    createUser({ name }) {
        const user = {
            id: id +
                name
        }
        providers.user.push(user)
        return user
    }
}

const connectToDb = require('./database/db')
const providers = { users: [] }
const graphql = require('graphql')
const { buildSchema } = require('graphql')
const Schema = buildSchema(`
    type Query {
    user: String
  }
`)

const name = "Matheus Nunes"

app.use('graphql', express)({
    Schema,
    rootValue: resolvers,
    graphql: true
})

connectToDb()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(routes)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))