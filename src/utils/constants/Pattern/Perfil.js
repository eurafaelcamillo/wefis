export default {
    request: {
        loading: false,
        message: {
            show: false,
            type: "success",
            text: ""
        }
    },
    form: {
        nome: "",
        telefone: "",
        email: "",
        senha: "",
        tipo: {
            comum: true,
            colaborador: false,
            administrador: false
        },
        status: {
            pendente: true,
            aprovado: false,
            reprovado: false
        }
    }
};
