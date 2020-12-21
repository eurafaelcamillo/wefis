const validation = (params) => {
    let response = [];

    params.forEach(item => {
        const { field, value } = item;

        // NOME
        if(field === "nome") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo nome é obrigatório!"
                });
            }
        }

        // TELEFONE
        if(field === "telefone") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo telefone é obrigatório!"
                });
            }
        }

        // ENDEREÇO
        if(field === "endereco") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo endereço é obrigatório!"
                });
            }
        }

        // E-MAIL
        if(field === "email") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo e-mail é obrigatório!"
                });
            }
        }

        // SENHA
        if(field === "senha") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo senha é obrigatório!"
                });
            }
        }

        // TÍTULO
        if(field === "titulo") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo título é obrigatório!"
                });
            }
        }

        // DESCRIÇÃO
        if(field === "descricao") {
            if(value === "") {
                response.push({
                    type: "error",
                    text: "O campo descrição é obrigatório!"
                });
            }
        }
    });

    return response;
};

export default validation;