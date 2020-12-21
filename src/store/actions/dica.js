import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createDica = (form, cb, navigation) => async dispatch => {
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

        const data = {
            titulo,
            descricao,
            data: new Date().toLocaleString('pt-BR'),
            status
        };

        const response = await firebase
            .database()
            .ref('dicas/')
            .push(data)

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {
            const dicas = await firebase.database().ref('/dicas/').once('value');

            dispatch({
                type: actionTypes.SET_DICAS,
                payload: dicas.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/dica/success")
            })

            cb('success');
            navigation.navigate("ColaboradorDicas");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const deleteDica = (_id, cb) => async dispatch => {
    try {

        const response = await firebase.database().ref('/dicas/'  + _id).remove();

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {
            const dicas = await firebase.database().ref('/dicas/').once('value');

            dispatch({
                type: actionTypes.SET_DICAS,
                payload: dicas.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("delete/dica/success")
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

export const prepareEditDica = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_EDIT_DICA,
        payload: item
    });

    navigation.navigate('ColaboradorEditarDica')
};

export const editDica = (form, cb, navigation) => async dispatch => {
    try {

        const {_id, titulo, descricao, data, status} = form;

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

        const response = await firebase
            .database()
            .ref('dicas/' + _id)
            .set({
                titulo,
                descricao,
                data,
                status
            });

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {
            const dicas = await firebase.database().ref('/dicas/').once('value');

            dispatch({
                type: actionTypes.SET_DICAS,
                payload: dicas.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("edit/dica/success")
            })

            cb('success');
            navigation.navigate("ColaboradorDicas");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const statusDica = (_id, status, cb) => async dispatch => {
    try {

        const response = await firebase
            .database()
            .ref('dicas/' + _id + '/status/')
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

            const dicas = await firebase.database().ref('/dicas/').once('value');

            dispatch({
                type: actionTypes.SET_DICAS,
                payload: dicas.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(`${status}/dica/success`)
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

export const prepareViewDica = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_VIEW_DICA,
        payload: item
    });

    navigation.navigate('VisualizarDica')
};

