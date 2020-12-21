import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createHospital = (form, cb, navigation) => async dispatch => {
    try {

        const {nome, email, telefone, endereco, status} = form;

        const validate = await validation([
            {
                field: "nome",
                value: nome
            },
            {
                field: "email",
                value: email
            },
            {
                field: "telefone",
                value: telefone
            },
            {
                field: "endereco",
                value: endereco
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
            email,
            telefone,
            endereco,
            data: new Date().toLocaleString(
                'pt-BR'
            ),
            status
        };

        const response = await firebase
            .database()
            .ref('hospitais/')
            .push(data);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const hospitais = await firebase.database().ref('/hospitais/').once('value');

            dispatch({
                type: actionTypes.SET_HOSPITAIS,
                payload: hospitais.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/hospital/success")
            });

            cb('success');
            navigation.navigate("ColaboradorHospitais");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const deleteHospital = (_id, cb) => async dispatch => {
    try {

        const response = await firebase.database().ref('/hospitais/'  + _id).remove();

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const hospitais = await firebase.database().ref('/hospitais/').once('value');

            dispatch({
                type: actionTypes.SET_HOSPITAIS,
                payload: hospitais.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("delete/hospital/success")
            });

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

export const prepareEditHospital = (item, navigation) => async dispatch => {

    dispatch({
        type: actionTypes.PREPARE_EDIT_HOSPITAL,
        payload: item
    });

    navigation.navigate('ColaboradorEditarHospital')
};

export const editHospital = (form, cb, navigation) => async dispatch => {
    try {

        const {_id, nome, email, telefone, endereco, data, status} = form;

        const validate = await validation([
            {
                field: "nome",
                value: nome
            },
            {
                field: "email",
                value: email
            },
            {
                field: "telefone",
                value: telefone
            },
            {
                field: "endereco",
                value: endereco
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
            .ref('hospitais/' + _id)
            .set({
                nome,
                email,
                telefone,
                endereco,
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

            const hospitais = await firebase.database().ref('/hospitais/').once('value');

            dispatch({
                type: actionTypes.SET_HOSPITAIS,
                payload: hospitais.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("edit/hospital/success")
            });

            cb('success');
            navigation.navigate("ColaboradorHospitais");
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

