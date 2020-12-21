import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  //token: '',
  user: {
    perfil: {
      nome: "",
      telefone: "",
      email: "",
      tipo: {
        comum: true,
        colaborador: false,
        administrador: false
      }
    }
  },
  isAuth: false,
  //loading: true,
  //isAppDataLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return update(state, { isAuth: { $set: true } });
    case actionTypes.AUTH_LOGOUT:
      return update(state, { $set: initialState });
    case actionTypes.AUTH_CHECK_TOKEN:
      return update(state, { isAuth: { $set: action.payload } });
    case actionTypes.SET_USER:
      return update(state, { user: { $set: action.payload.user }});
    case actionTypes.EDIT_USER:
      return update(state, { user: {
          perfil : {
            nome: {$set: action.payload.perfil.nome},
            telefone: {$set: action.payload.perfil.telefone},
            email: {$set: action.payload.perfil.email}
          }
        }});
    default:
      return state;
  }
};

export default reducer;
