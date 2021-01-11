import * as actionTypes from './actionTypes';
import firebase from "firebase";
import validation from "../../utils/function/validation";
import {getMessageByCode} from "../../utils/function/general";

export const login = (email, senha, cb, navigation) => async dispatch => {
    try {

        const validate = await validation([
            {
                field: "email",
                value: email
            },
            {
                field: "senha",
                value: senha
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

        const response =  await firebase
            .auth()
            .signInWithEmailAndPassword(email, senha);

        if(response && response.code) {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: getMessageByCode(response.code)
            })

            cb('error');
        } else {
            const { currentUser } = await firebase.auth();

            const id = currentUser.uid;

            const user = await firebase.database().ref('/users/' + id).once('value');

            const userHelper = user.val();

            if(userHelper && userHelper.perfil.status.aprovado) {
                dispatch({
                    type: actionTypes.AUTH_LOGIN,
                });

                dispatch({
                    type: actionTypes.SET_USER,
                    payload: { user: { perfil: userHelper.perfil }}
                });

                dispatch({
                    type: actionTypes.SHOW_NOTIFICATION,
                    payload: getMessageByCode("auth/success")
                });

                cb('success');
                navigation.navigate("Menu");
            } else {
                dispatch({
                    type: actionTypes.SHOW_NOTIFICATION,
                    payload: getMessageByCode("auth/user-not-found")
                });
            }
        }

    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const logout = (navigation) => async dispatch => {
    try {

        await firebase
            .auth()
            .signOut();

        dispatch({
            type: actionTypes.AUTH_LOGOUT
        });

        navigation.navigate('Acesso');

    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};

export const checkToken = (navigation) => async dispatch => {
    try {

        const firebaseConfig = {
            apiKey: "AIzaSyCDU69G11LfEHDppVfZ5k9QwzRnJQMzcxE",
            authDomain: "wefis-a6bc9.firebaseapp.com",
            databaseURL: "https://wefis-a6bc9.firebaseio.com",
            projectId: "wefis-a6bc9",
            storageBucket: "wefis-a6bc9.appspot.com",
            messagingSenderId: "286238389070",
            appId: "1:286238389070:web:3d953aac7b6a6128d9a41f"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const { currentUser } = await firebase.auth();

        if(!!currentUser) {

            const id = currentUser.uid;

            const user = await firebase.database().ref('/users/' + id).once('value');

            dispatch({
                type: actionTypes.SET_USER,
                payload: { user: { perfil: user.val().perfil }}
            });

            // DICA [REMOVER]

            const dicas = await firebase.database().ref('/dicas/').once('value');

            dispatch({
                type: actionTypes.SET_DICAS,
                payload: dicas.val()
            });

            // DEPOIMENTO [REMOVER]

            const depoimentos = await firebase.database().ref('/depoimentos/').once('value');

            dispatch({
                type: actionTypes.SET_DEPOIMENTOS,
                payload: depoimentos.val()
            });

            // TRATAMENTO [REMOVER]

            const tratamentos = await firebase.database().ref('/tratamentos/').once('value');

            dispatch({
                type: actionTypes.SET_TRATAMENTOS,
                payload: tratamentos.val()
            });

            // CIRURGIAS [REMOVER]

            const cirurgias = await firebase.database().ref('/cirurgias/').once('value');

            dispatch({
                type: actionTypes.SET_CIRURGIAS,
                payload: cirurgias.val()
            });

            // HOSPITAIS [REMOVER]

            const hospitais = await firebase.database().ref('/hospitais/').once('value');

            dispatch({
                type: actionTypes.SET_HOSPITAIS,
                payload: hospitais.val()
            });

            // EVOLUCÕES [REMOVER]

            const evolucoes = await firebase.database().ref('/users/' + id + '/evolucoes/').once('value');

            dispatch({
                type: actionTypes.SET_EVOLUCOES,
                payload: evolucoes.val()
            });

            // TIPO USUÁRIO = ADMINISTRADOR
            if(user.val().perfil.tipo.administrador) {
                // USUÁRIOS [REMOVER]

                const users = await firebase.database().ref('/users/').once('value');

                dispatch({
                    type: actionTypes.SET_USERS,
                    payload: users.val()
                });
            }
        }

        dispatch({
            type: actionTypes.AUTH_CHECK_TOKEN,
            payload: !!currentUser
        });

        return !!currentUser;

    } catch (e) {

        console.log(e);

        dispatch({
            type: actionTypes.SHOW_NOTIFICATION,
            payload: getMessageByCode(e.code)
        })

        cb('error');
    }
};