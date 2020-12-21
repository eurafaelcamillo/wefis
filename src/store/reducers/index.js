import { combineReducers } from "redux";
import authReducer from "./auth";
import dicasReducer from "./dica";
import tratamentosReducer from "./tratamento";
import cirurgiasReducer from "./cirurgia";
import hospitaisReducer from "./hospital";
import usersReducer from "./user";
import depoimentosReducer from "./depoimento";
import evolucoesReducer from "./evolucao";
import notificationReducer from "./notification";

export default combineReducers({
  auth: authReducer,
  dicas: dicasReducer,
  tratamentos: tratamentosReducer,
  cirurgias: cirurgiasReducer,
  hospitais: hospitaisReducer,
  depoimentos: depoimentosReducer,
  evolucoes: evolucoesReducer,
  notification: notificationReducer,
  users: usersReducer
});