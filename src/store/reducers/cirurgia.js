import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  cirurgias: {},
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
    case actionTypes.SET_CIRURGIAS:
      return update(state, { cirurgias: { $set: action.payload }});
    case actionTypes.DELETE_CIRURGIA:
      const cirurgias = state.cirurgias;
      delete cirurgias[action.payload];
      return update(state, { cirurgias: { $set: cirurgias }});
    case actionTypes.PREPARE_EDIT_CIRURGIA:
      return update(state, {
        editando: { $set: action.payload }
      });
    case actionTypes.PREPARE_VIEW_CIRURGIA:
      return update(state, {
        visualizando: { $set: action.payload }
      });
    default:
      return state;
  }
};

export default reducer;
