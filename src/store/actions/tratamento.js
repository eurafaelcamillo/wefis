import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createTratamento = (form, cb, navigation) => async dispatch => {
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
            .ref('tratamentos/')
            .push(data);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const tratamentos = await firebase.database().ref('/tratamentos/').once('value');

            dispatch({
                type: actionTypes.SET_TRATAMENTOS,
                payload: tratamentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/tratamento/success")
            });

            cb('success');
            navigation.navigate("ColaboradorTratamentos");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const deleteTratamento = (_id, cb) => async dispatch => {
    try {

        const response = await firebase.database().ref('/tratamentos/'  + _id).remove();

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const tratamentos = await firebase.database().ref('/tratamentos/').once('value');

            dispatch({
                type: actionTypes.SET_TRATAMENTOS,
                payload: tratamentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("delete/tratamento/success")
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

export const prepareEditTratamento = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_EDIT_TRATAMENTO,
        payload: item
    });

    navigation.navigate('ColaboradorEditarTratamento')
};

export const editTratamento = (form, cb, navigation) => async dispatch => {
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
            .ref('tratamentos/' + _id)
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

            const tratamentos = await firebase.database().ref('/tratamentos/').once('value');

            dispatch({
                type: actionTypes.SET_TRATAMENTOS,
                payload: tratamentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("edit/tratamento/success")
            });

            cb('success');
            navigation.navigate("ColaboradorTratamentos");
        }
    } catch (e) {
        cb('error', e.code);
    }
};

export const statusTratamento = (_id, status, cb) => async dispatch => {
    try {

        const response = await firebase
            .database()
            .ref('tratamentos/' + _id + '/status/')
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

            const tratamentos = await firebase.database().ref('/tratamentos/').once('value');

            dispatch({
                type: actionTypes.SET_TRATAMENTOS,
                payload: tratamentos.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(`${status}/tratamento/success`)
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

export const prepareViewTratamento = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_VIEW_TRATAMENTO,
        payload: item
    });

    navigation.navigate('VisualizarTratamento')
};


