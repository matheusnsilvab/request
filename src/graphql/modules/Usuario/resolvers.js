type Usuario {
  id: Int
  nome: String
  idade: Int
  email: String
  perfil: Perfil
}

input UsuarioInput {
  nome: String
  idade: Int
  email: String
}

type Query {
  usuario(id: Int): Usuario
  usuarios: [Usuario]
}

type Mutation {
  criarUsuario(data: UsuarioInput): Usuario!
  atualizarUsuario(id: Int!, data: UsuarioInput): Usuario!
}
