import immutable from 'seamless-immutable';
import { AsyncStorage } from 'react-native';
import App from '../app';

const INITIAL_STATE = immutable({


})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {


        default:
            return state;
    }

}