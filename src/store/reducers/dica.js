import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  dicas: {},
  editando: {
    _id: 0,
    titulo: "",
    descricao: "",
    data: "",
    status: {
      pendente: true,
      aprovado: false
    }
  },
  visualizando: {
    _id: 0,
    titulo: "",
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
    case actionTypes.SET_DICAS:
      return update(state, { dicas: { $set: action.payload }});
    case actionTypes.DELETE_DICA:
      const dicas = state.dicas;
      delete dicas[action.payload];
      return update(state, { dicas: { $set: dicas }});
    case actionTypes.PREPARE_EDIT_DICA:
      return update(state, {
        editando: { $set: action.payload }
      });
    case actionTypes.PREPARE_VIEW_DICA:
      return update(state, {
        visualizando: { $set: action.payload }
      });
    default:
      return state;
  }
};

export default reducer;
