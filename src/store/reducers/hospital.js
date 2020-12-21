import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  hospitais: {},
  editando: {
    _id: 0,
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    data: "",
    status: {
      pendente: true,
      aprovado: false
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOSPITAIS:
      return update(state, { hospitais: { $set: action.payload }});
    case actionTypes.DELETE_HOSPITAL:
      const hospitais = state.hospitais;
      delete hospitais[action.payload];
      return update(state, { hospitais: { $set: hospitais }});
    case actionTypes.PREPARE_EDIT_HOSPITAL:
      return update(state, {
        editando: { $set: action.payload }
      });
    default:
      return state;
  }
};

export default reducer;
