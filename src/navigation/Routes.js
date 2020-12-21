// PADRÃO
import Menu from '../views/Menu';
import Perfil from '../views/Perfil';
import Cadastro from '../views/Cadastro';
import Login from '../views/Login';

// USUÁRIO COMUM

import Sobre from '../screens/Menu/Sobre';
import TiposFissuras from '../screens/Menu/TiposFissuras';
import PrimeirosPassos from '../screens/Menu/PrimeirosPassos';

import Dicas from '../views/Comum/Dica/Listagem';
import VisualizarDica from '../views/Comum/Dica/Visualizar';

import Tratamentos from '../views/Comum/Tratamento/Listagem';
import VisualizarTratamento from '../views/Comum/Tratamento/Visualizar';

import Cirurgias from '../views/Comum/Cirurgia/Listagem';
import VisualizarCirurgia from '../views/Comum/Cirurgia/Visualizar';

import Hospitais from '../views/Comum/Hospital/Listagem';

import Depoimentos from '../views/Comum/Depoimento/Listagem';
import RealizarDepoimento from '../views/Comum/Depoimento/Cadastro';
import VisualizarDepoimento from '../views/Comum/Depoimento/Visualizar';

import Evolucoes from '../views/Comum/Evolucao/Listagem';
import CadastrarEvolucao from '../views/Comum/Evolucao/Cadastro';

// USUÁRIO ADMINISTRADOR

import AdmColaboradores from '../views/Administrador/Colaborador/Listagem';
import AdmDicas from '../views/Administrador/Dica/Listagem';
import AdmTratamentos from '../views/Administrador/Tratamento/Listagem';
import AdmCirurgias from '../views/Administrador/Cirurgia/Listagem';
import AdmDepoimentos from '../views/Administrador/Depoimento/Listagem';
import AdmReportar from '../screens/Administrador/Reportar';

// USUÁRIO COLABORADOR

import ColaboradorDicas from '../views/Colaborador/Dica/Listagem';
import ColaboradorCadastrarDica from '../views/Colaborador/Dica/Cadastro';
import ColaboradorEditarDica from '../views/Colaborador/Dica/Edicao';

import ColaboradorTratamentos from '../views/Colaborador/Tratamento/Listagem';
import ColaboradorCadastrarTratamento from '../views/Colaborador/Tratamento/Cadastro';
import ColaboradorEditarTratamento from '../views/Colaborador/Tratamento/Edicao';

import ColaboradorCirurgias from '../views/Colaborador/Cirurgia/Listagem';
import ColaboradorCadastrarCirurgia from '../views/Colaborador/Cirurgia/Cadastro';
import ColaboradorEditarCirurgia from '../views/Colaborador/Cirurgia/Edicao';

import ColaboradorHospitais from '../views/Colaborador/Hospital/Listagem';
import ColaboradorCadastrarHospital from '../views/Colaborador/Hospital/Cadastro';
import ColaboradorEditarHospital from '../views/Colaborador/Hospital/Edicao';

import React from "react";

const routes = [
  {
    id: 1,
    name: "Perfil",
    screenComponent: (props) => {
      return <Perfil {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: true,
      colaborador: true
    }
  },
  {
    id: 2,
    name: "Cadastro",
    screenComponent: (props) => {
      return <Cadastro {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: true,
      colaborador: true
    }
  },
  {
    id: 3,
    name: "Acesso",
    screenComponent: (props) => {
      return <Login {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: true,
      colaborador: true
    }
  },
  {
    id: 4,
    name: "Menu",
    screenComponent: (props) => {
      return <Menu {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: true,
      colaborador: true
    }
  },
  {
    id: 5,
    name: "Sobre",
    screenComponent: (props) => {
      return <Sobre {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 6,
    name: "TiposFissuras",
    screenComponent: (props) => {
      return <TiposFissuras {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 7,
    name: "PrimeirosPassos",
    screenComponent: (props) => {
      return <PrimeirosPassos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 8,
    name: "Dicas",
    screenComponent: (props) => {
      return <Dicas {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 9,
    name: "Tratamentos",
    screenComponent: (props) => {
      return <Tratamentos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 10,
    name: "Cirurgias",
    screenComponent: (props) => {
      return <Cirurgias {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 11,
    name: "Depoimentos",
    screenComponent: (props) => {
      return <Depoimentos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 12,
    name: "Hospitais",
    screenComponent: (props) => {
      return <Hospitais {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 13,
    name: "CadastrarEvolucao",
    screenComponent: (props) => {
      return <CadastrarEvolucao {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 14,
    name: "Evolucoes",
    screenComponent: (props) => {
      return <Evolucoes {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 15,
    name: "RealizarDepoimento",
    screenComponent: (props) => {
      return <RealizarDepoimento {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 16,
    name: "VisualizarDica",
    screenComponent: (props) => {
      return <VisualizarDica {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 17,
    name: "VisualizarTratamento",
    screenComponent: (props) => {
      return <VisualizarTratamento {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 18,
    name: "VisualizarCirurgia",
    screenComponent: (props) => {
      return <VisualizarCirurgia {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },
  {
    id: 19,
    name: "VisualizarDepoimento",
    screenComponent: (props) => {
      return <VisualizarDepoimento {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: true,
      administrador: false,
      colaborador: false
    }
  },

  {
    id: 20,
    name: "AdmColaboradores",
    screenComponent: (props) => {
      return <AdmColaboradores {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },
  {
    id: 21,
    name: "AdmDicas",
    screenComponent: (props) => {
      return <AdmDicas {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },
  {
    id: 22,
    name: "AdmTratamentos",
    screenComponent: (props) => {
      return <AdmTratamentos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },
  {
    id: 23,
    name: "AdmCirurgias",
    screenComponent: (props) => {
      return <AdmCirurgias {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },
  {
    id: 24,
    name: "AdmDepoimentos",
    screenComponent: (props) => {
      return <AdmDepoimentos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },
  {
    id: 25,
    name: "AdmReportar",
    screenComponent: (props) => {
      return <AdmReportar {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: true,
      colaborador: false
    }
  },

  {
    id: 26,
    name: "ColaboradorDicas",
    screenComponent: (props) => {
      return <ColaboradorDicas {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 27,
    name: "ColaboradorCadastrarDica",
    screenComponent: (props) => {
      return <ColaboradorCadastrarDica {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 28,
    name: "ColaboradorEditarDica",
    screenComponent: (props) => {
      return <ColaboradorEditarDica {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 29,
    name: "ColaboradorTratamentos",
    screenComponent: (props) => {
      return <ColaboradorTratamentos {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 30,
    name: "ColaboradorCadastrarTratamento",
    screenComponent: (props) => {
      return <ColaboradorCadastrarTratamento {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 31,
    name: "ColaboradorEditarTratamento",
    screenComponent: (props) => {
      return <ColaboradorEditarTratamento {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 32,
    name: "ColaboradorCirurgias",
    screenComponent: (props) => {
      return <ColaboradorCirurgias {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 33,
    name: "ColaboradorCadastrarCirurgia",
    screenComponent: (props) => {
      return <ColaboradorCadastrarCirurgia {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 34,
    name: "ColaboradorEditarCirurgia",
    screenComponent: (props) => {
      return <ColaboradorEditarCirurgia {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 35,
    name: "ColaboradorHospitais",
    screenComponent: (props) => {
      return <ColaboradorHospitais {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 36,
    name: "ColaboradorCadastrarHospital",
    screenComponent: (props) => {
      return <ColaboradorCadastrarHospital {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
  {
    id: 37,
    name: "ColaboradorEditarHospital",
    screenComponent: (props) => {
      return <ColaboradorEditarHospital {...props} />;
    },
    options: {
      headerShown: false
    },
    permission: {
      comum: false,
      administrador: false,
      colaborador: true
    }
  },
];

export default routes;
