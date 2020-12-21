import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  notification: {
    show: false,
    type: "success",
    title: "",
    text: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return update(state, { notification: { $set: action.payload }});
    case actionTypes.HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
