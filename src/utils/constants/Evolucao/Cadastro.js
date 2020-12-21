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
        descricao: "",
        imagem: null,
        data: "",
        status: {
            pendente: false,
            aprovado: true,
            reprovado: false
        }
    }
};
