import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createCirurgia = (form, cb, navigation) => async dispatch => {
    try {

        const {nome, descricao, status} = form;

        const validate = await validation([
            {
                field: "nome",
                value: nome
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
            nome,
            descricao,
            data: new Date().toLocaleString(
                'pt-BR'
            ),
            status
        };

        const response = await firebase
            .database()
            .ref('cirurgias/')
            .push(data);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const cirurgias = await firebase.database().ref('/cirurgias/').once('value');

            dispatch({
                type: actionTypes.SET_CIRURGIAS,
                payload: cirurgias.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/cirurgia/success")
            })

            cb('success');
            navigation.navigate("ColaboradorCirurgias");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const deleteCirurgia = (_id, cb) => async dispatch => {
    try {

        const response = await firebase.database().ref('/cirurgias/'  + _id).remove();

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {
            const cirurgias = await firebase.database().ref('/cirurgias/').once('value');

            dispatch({
                type: actionTypes.SET_CIRURGIAS,
                payload: cirurgias.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("delete/cirurgia/success")
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

export const prepareEditCirurgia = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_EDIT_CIRURGIA,
        payload: item
    });

    navigation.navigate('ColaboradorEditarCirurgia')
};

export const editCirurgia = (form, cb, navigation) => async dispatch => {
    try {

        const {_id, nome, descricao, data, status} = form;

        const validate = await validation([
            {
                field: "nome",
                value: nome
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
            .ref('cirurgias/' + _id)
            .set({
                nome,
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
            const cirurgias = await firebase.database().ref('/cirurgias/').once('value');

            dispatch({
                type: actionTypes.SET_CIRURGIAS,
                payload: cirurgias.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("edit/cirurgia/success")
            });

            cb('success');
            navigation.navigate("ColaboradorCirurgias");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const statusCirurgia = (_id, status, cb) => async dispatch => {
    try {

        const response = await firebase
            .database()
            .ref('cirurgias/' + _id + '/status/')
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

            const cirurgias = await firebase.database().ref('/cirurgias/').once('value');

            dispatch({
                type: actionTypes.SET_CIRURGIAS,
                payload: cirurgias.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(`${status}/cirurgia/success`)
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

export const prepareViewCirurgia = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_VIEW_CIRURGIA,
        payload: item
    });

    navigation.navigate('VisualizarCirurgia')
};
