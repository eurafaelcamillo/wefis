import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createEvolucao = (form, cb, navigation) => async dispatch => {
    try {

        const {imagem, descricao, status} = form;

        const validate = await validation([
            {
                field: "descricao",
                value: descricao
            }
        ]);

        if(validate.length > 0) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    show: true,
                    type: validate[0].type,
                    text: validate[0].text
                }
            });

            return cb('error');
        }

        const { currentUser } = await firebase.auth();

        const id = currentUser.uid;

        const data = {
            imagem,
            descricao,
            data: new Date().toLocaleString(
                'pt-BR'
            ),
            status
        };

        const response = await firebase
            .database()
            .ref('/users/' + id + '/evolucoes/')
            .push(data);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const evolucoes = await firebase.database().ref('/users/' + id + '/evolucoes/').once('value');

            dispatch({
                type: actionTypes.SET_EVOLUCOES,
                payload: evolucoes.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/evolucao/success")
            });

            cb('success');
            navigation.navigate("Evolucoes");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

