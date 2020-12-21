import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  evolucoes: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVOLUCOES:
      return update(state, { evolucoes: { $set: action.payload }});
    default:
      return state;
  }
};

export default reducer;
