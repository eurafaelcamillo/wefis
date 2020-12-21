import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createDepoimento = (form, cb, navigation) => async dispatch => {
    try {

        const {titulo, descricao, status} = form;

        const validate = await validation([
            {
                field: "titulo",
                value: titulo
            },
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
        const _id = currentUser.uid;

        const user = await firebase.database().ref('/users/' + _id).once('value');
        const nome = user.val().perfil.nome;

        const data = {
            pessoa: {
                _id,
                nome
            },
            titulo,
            descricao,
            data: new Date().toLocaleString(
                'pt-BR'
            ),
            status
        };

        const response = await firebase
            .database()
            .ref('depoimentos/')
            .push(data)

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const depoimentos = await firebase.database().ref('/depoimentos/').once('value');

            dispatch({
                type: actionTypes.SET_DEPOIMENTOS,
                payload: depoimentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/depoimento/success")
            })

            cb('success');
            navigation.navigate("Depoimentos");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const statusDepoimento = (_id, status, cb) => async dispatch => {
    try {

        const response = await firebase
            .database()
            .ref('depoimentos/' + _id + '/status/')
            .set({
                pendente: false,
                aprovado: status === "approve",
                reprovado: status === "disapprove",
                reportado: false
            });

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const depoimentos = await firebase.database().ref('/depoimentos/').once('value');

            dispatch({
                type: actionTypes.SET_DEPOIMENTOS,
                payload: depoimentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(`${status}/depoimento/success`)
            })

            cb('success');
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const prepareViewMoreDepoimento = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_VIEW_DEPOIMENTO,
        payload: item
    });

    navigation.navigate('VisualizarDepoimento')
};

