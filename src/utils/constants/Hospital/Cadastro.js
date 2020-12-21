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
        _id: 0,
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        data: "",
        status: {
            pendente: false,
            aprovado: true,
            reprovado: false,
            reportado: false
        }
    }
};
