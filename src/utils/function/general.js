export function getMessageByCode(code) {
   const message = {
    show: false,
    type: "success",
    text: ""
  }

  switch (code) {
    case 'auth/clear':
      message.show = true;
      message.text = "";
      message.type = "success";
      break;
    case 'auth/success':
      message.show = true;
      message.text = "Usuário Autenticado!";
      message.type = "success";
      break;
    case 'auth/wrong-password':
      message.show = true;
      message.text = "Senha Incorreta!";
      message.type = "error";
      break;
    case 'auth/invalid-email':
      message.show = true;
      message.text = "E-mail Inválido!";
      message.type = "error";
      break;
    case 'auth/user-not-found':
      message.show = true;
      message.text = "Usuário Não Encontrado!";
      message.type = "error";
      break;
    case 'auth/email-already-in-use':
      message.show = true;
      message.text = "Este e-mail encontra-se em uso!";
      message.type = "error";
      break;

    // USUÁRIO
    case 'create/user/success':
      message.show = true;
      message.text = "Usuário Cadastrado com Sucesso!";
      message.type = "success";
      break;
    case 'perfil-edit/user/success':
      message.show = true;
      message.text = "Perfil Editado com Sucesso!";
      message.type = "success";
      break;
    case 'approve/user/success':
      message.show = true;
      message.text = "Usuário Aprovado com Sucesso!";
      message.type = "success";
      break;
    case 'disapprove/user/success':
      message.show = true;
      message.text = "Usuário Reprovado com Sucesso!";
      message.type = "success";
      break;

    // DICA
    case 'create/dica/success':
      message.show = true;
      message.text = "Dica Cadastrada com Sucesso!";
      message.type = "success";
      break;
    case 'edit/dica/success':
      message.show = true;
      message.text = "Dica Editada com Sucesso!";
      message.type = "success";
      break;
    case 'delete/dica/success':
      message.show = true;
      message.text = "Dica Deletada com Sucesso!";
      message.type = "success";
      break;
    case 'approve/dica/success':
      message.show = true;
      message.text = "Dica Aprovada com Sucesso!";
      message.type = "success";
      break;
    case 'disapprove/dica/success':
      message.show = true;
      message.text = "Dica Reprovada com Sucesso!";
      message.type = "success";
      break;

    // TRATAMENTO
    case 'create/tratamento/success':
      message.show = true;
      message.text = "Tratamento Cadastrado com Sucesso!";
      message.type = "success";
      break;
    case 'edit/tratamento/success':
      message.show = true;
      message.text = "Tratamento Editado com Sucesso!";
      message.type = "success";
      break;
    case 'delete/tratamento/success':
      message.show = true;
      message.text = "Tratamento Deletado com Sucesso!";
      message.type = "success";
      break;
    case 'approve/tratamento/success':
      message.show = true;
      message.text = "Tratamento Aprovado com Sucesso!";
      message.type = "success";
      break;
    case 'disapprove/tratamento/success':
      message.show = true;
      message.text = "Tratamento Reprovado com Sucesso!";
      message.type = "success";
      break;

    // CIRURGIA
    case 'create/cirurgia/success':
      message.show = true;
      message.text = "Cirurgia Cadastrada com Sucesso!";
      message.type = "success";
      break;
    case 'edit/cirurgia/success':
      message.show = true;
      message.text = "Cirurgia Editada com Sucesso!";
      message.type = "success";
      break;
    case 'delete/cirurgia/success':
      message.show = true;
      message.text = "Cirurgia Deletada com Sucesso!";
      message.type = "success";
      break;
    case 'approve/cirurgia/success':
      message.show = true;
      message.text = "Cirurgia Aprovada com Sucesso!";
      message.type = "success";
      break;
    case 'disapprove/Cirurgia/success':
      message.show = true;
      message.text = "Dica Reprovada com Sucesso!";
      message.type = "success";
      break;

    // HOSPITAL
    case 'create/hospital/success':
      message.show = true;
      message.text = "Hospital Cadastrado com Sucesso!";
      message.type = "success";
      break;
    case 'edit/hospital/success':
      message.show = true;
      message.text = "Hospital Editado com Sucesso!";
      message.type = "success";
      break;
    case 'delete/hospital/success':
      message.show = true;
      message.text = "Hospital Deletado com Sucesso!";
      message.type = "success";
      break;

    // DEPOIMENTO
    case 'create/depoimento/success':
      message.show = true;
      message.text = "Depoimento Cadastrado com Sucesso!";
      message.type = "success";
      break;
    case 'approve/depoimento/success':
      message.show = true;
      message.text = "Depoimento Aprovado com Sucesso!";
      message.type = "success";
      break;
    case 'disapprove/depoimento/success':
      message.show = true;
      message.text = "Depoimento Reprovado com Sucesso!";
      message.type = "success";
      break;

    // EVOLUÇÃO
    case 'create/evolucao/success':
      message.show = true;
      message.text = "Evolução Cadastrada com Sucesso!";
      message.type = "success";
      break;

    default:
      message.show = true;
      message.text = "Erro Desconhecido!";
      message.type = "error";
      break;
  }

  return message;
}
