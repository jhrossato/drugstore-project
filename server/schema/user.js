const user = {
    nome: {
        required: "Nome é um campo obrigatório!"
    },
    senha: {
        required: "Senha é um campo obrigatório!",
        min: 8,
        max: 12
    },
    email: {
        required: "E-mail é um campo obrigatório!"
    },
    cpf: {
        required: "CPF é um campo obrigatório!"
    },
    adm: {
        required: "Adm é um campo obrigatório!"
    }
}

const validationRegex = {
    email: {
        regex: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+.-]+$"
    },
    cpf:{
        regex: "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
    }
}

module.exports = {
    user,
    validationRegex
}