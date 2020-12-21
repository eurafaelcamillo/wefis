import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  depoimentos: {},
  visualizando: {
    _id: 0,
    pessoa: {
      _id: 0,
      nome: ""
    },
    titulo: "",
    descricao: "",
    data: "",
    status: {
      pendente: true,
      aprovado: false,
      reprovado: false,
      reportado: false
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEPOIMENTOS:
      return update(state, { depoimentos: { $set: action.payload }});
    case actionTypes.PREPARE_VIEW_DEPOIMENTO:
      return update(state, {
        visualizando: { $set: action.payload }
      });
    default:
      return state;
  }
};

export default reducer;
