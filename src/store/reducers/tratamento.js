import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  tratamentos: {},
  editando: {
    _id: 0,
    nome: "",
    descricao: "",
    data: "",
    status: {
      pendente: true,
      aprovado: false
    }
  },
  visualizando: {
    _id: 0,
    nome: "",
    descricao: "",
    data: "",
    status: {
      pendente: true,
      aprovado: false
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRATAMENTOS:
      return update(state, { tratamentos: { $set: action.payload }});
    case actionTypes.DELETE_TRATAMENTO:
      const tratamentos = state.tratamentos;
      delete tratamentos[action.payload];
      return update(state, { tratamentos: { $set: tratamentos }});
    case actionTypes.PREPARE_EDIT_TRATAMENTO:
      return update(state, {
        editando: { $set: action.payload }
      });
    case actionTypes.PREPARE_VIEW_TRATAMENTO:
      return update(state, {
        visualizando: { $set: action.payload }
      });
    default:
      return state;
  }
};

export default reducer;
