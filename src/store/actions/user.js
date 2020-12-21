import firebase from "firebase";
import * as actionTypes from "./actionTypes";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const createLoginUser = (form, cb, navigation) => async dispatch => {
    try {

        const {nome, telefone, email, senha, tipo, status} = form;

        const validate = await validation([
            {
                field: "nome",
                value: nome
            },
            {
                field: "telefone",
                value: telefone
            },
            {
                field: "email",
                value: email
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

        // TODO: MELHORAR ESSE TRECHO DE CÓDIGO

        const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha);

        await firebase
            .auth()
            .signOut();

        localStorage.clear();

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const data = {
                nome,
                telefone,
                email,
                tipo,
                status: tipo.colaborador ? status : {
                    pendente: false,
                    aprovado: true,
                    reprovado: false
                }
            };

            const id = response.user.uid;

            await firebase
                .database()
                .ref('users/' + id + '/perfil/')
                .set(data);

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("create/user/success")
            })

            cb('success');
            navigation.navigate('Acesso');
        }
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const editPerfilUser = (form, cb) => async dispatch => {
    try {

        const {nome, telefone, email, tipo, status} = form;

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
            telefone,
            email,
            tipo,
            status
        }

        const user = await firebase
            .auth()
            .currentUser

        const id = user.uid;

        await user.updateEmail(email);

        const response = await firebase
            .database()
            .ref('users/' + id + '/perfil/')
            .set(data);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            dispatch({
                type: actionTypes.EDIT_USER,
                payload: {perfil: data}
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode("perfil-edit/user/success")
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

export const statusUser = (_id, status, cb) => async dispatch => {
    try {

        const response = await firebase
            .database()
            .ref('users/' + _id + '/perfil//status/')
            .set({
                pendente: false,
                aprovado: status === "approve",
                reprovado: status === "disapprove"
            });

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {

            const users = await firebase.database().ref('/users/').once('value');

            dispatch({
                type: actionTypes.SET_USERS,
                payload: users.val()
            });

            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(`${status}/user/success`)
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