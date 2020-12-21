import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  users: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return update(state, { users: { $set: action.payload }});
    default:
      return state;
  }
};

export default reducer;
