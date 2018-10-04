import immutable from 'seamless-immutable';
import { Type as GlobalActionType } from '../actions/GlobalActions';
import { AsyncStorage } from 'react-native';

const INITIAL_STATE = immutable({
    user: {},
    token: null,
    checkingCredentials: false,
    loggedIn: false,
    logInFailed: false,
    //register
    errorMessage: '',
    registerFailed: false,
    //FB
    facebookLoging: false,
    facebookLogedIn: false,
    facebookLogingFailed: false,
    //GMAIL
    gmailLoging: false,
    gmailLogedIn: false,
    gmailLogingFailed: false
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GlobalActionType.LOGOUT:
            AsyncStorage.clear();
            return INITIAL_STATE;
            break;

        case GlobalActionType.SET_INITIAL_STATE:
            let componentToSetInitialState = {};
            let value = INITIAL_STATE[action.data];
            componentToSetInitialState[action.data] = value;
            return state.merge({ ...componentToSetInitialState });
            break;

        case GlobalActionType.REGISTER_REST_CALL:

            checkingCredentials = true;
            return state.merge({ checkingCredentials });
            break;

        case GlobalActionType.REGISTER_SUCCESS:
            {
                let token = action.data.token;
                let user = action.data.korisnik;
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('user', JSON.stringify(user));
                let loggedIn = true;
                let checkingCredentials = false;
                return state.merge({ loggedIn, token, user, checkingCredentials });
            }
            break;

        case GlobalActionType.REGISTER_FAILED: {
            let registerFailed = true;
            let errorMessage = action.data;
            return state.merge({ registerFailed, errorMessage });
            break;
        }

        case GlobalActionType.LOGIN_REST_CALL:
            let checkingCredentials = true;
            return state.merge({ checkingCredentials });
            break;

        case GlobalActionType.LOGIN_SUCCESS: {
            let token = action.data.token;
            let user = action.data.user

            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('user', JSON.stringify(user));
            let loggedIn = true;
            return state.merge({ token, loggedIn, user });
            break;
        }

        case GlobalActionType.LOGIN_FAILED:
            let logInFailed = true;
            return state.merge({ logInFailed });
            break;


        case GlobalActionType.FB_LOGIN_CALL: {
            let facebookLoging = true;
            return state.merge({ facebookLoging });
            break;
        }

        case GlobalActionType.FB_LOGIN_SUCCESS: {
            let facebookLoging = false;
            let facebookLogedIn = true;
            let token = action.data.token;
            let user = action.data.user;
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('user', JSON.stringify(user));
            return state.merge({ facebookLoging, facebookLogedIn, token, user })
        }

        case GlobalActionType.FB_LOGIN_FAILED: {
            let facebookLogingFailed = true;
            let facebookLoging = false;
            return state.merge({ facebookLoging, facebookLogingFailed });
            break;
        }

        case GlobalActionType.GMAIL_LOGIN_CALL: {
            let gmailLoging = true;
            return state.merge({ gmailLoging });
            break;
        }

        case GlobalActionType.GMAIL_LOGIN_SUCCESS: {
            let gmailLoging = false;
            let gmailLogedIn = true;
            let token = action.data.token;
            let user = action.data.korisnik;
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('user', JSON.stringify(user));

            return state.merge({ gmailLoging, gmailLogedIn, token, user })
        }

        case GlobalActionType.GMAIL_LOGIN_FAILED: {
            let gmailLogingFailed = true;
            let gmailLoging = false;
            return state.merge({ gmailLoging, gmailLogingFailed });
            break;
        }



        default:
            return state;
    }
}