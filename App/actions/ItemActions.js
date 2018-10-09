import axios from '../utils/AxiosWrapper';
import { config } from '../config/config';

const serverUrl = config.serverUrl;
export const Type = {
    GET_ITEMS_CALL: 'GET_ITEMS_CALL',
    GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS',
    GET_ITEMS_FAILED: 'GET_ITEMS_FAILED',

    SET_ITEM_PROPERTY: 'SET_ITEM_PROPERTY',

    ITEM_POSTING_CALL: 'ITEM_POSTING_CALL',
    ITEM_POSTING_SUCCESS: 'ITEM_POSTING_SUCCESS',
    ITEM_POSTING_FAILED: 'ITEM_POSTING_FAILED',


    SET_INITIAL_STATE: 'SET_INITIAL_STATE',
};

export function setInitialState(component) {
    return (dispatch) => {
        dispatch({
            type: Type.SET_INITIAL_STATE,
            data: component
        });
    }
}


export function getItems() {
    return (dispatch) => {
        dispatch({
            type: Type.GET_ITEMS_CALL
        });

        axios.get(serverUrl + '/api/item/read')
            .then(function (response) {
                dispatch({
                    type: Type.GET_ITEMS_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: Type.GET_ITEMS_FAILED
                });
            });
    }
}

export function setItemPropertyInReducer(name, value) {
    return (dispatch) => {
        dispatch({
            type: Type.SET_ITEM_PROPERTY,
            value: value,
            name: name
        })
    }
}

export function createItem(item) {
    return (dispatch) => {
        dispatch({
            type: Type.ITEM_POSTING_CALL
        })

        axios.post(serverUrl + '/api/item/create',
            item
        )
            .then(function (response) {
                dispatch({
                    type: Type.ITEM_POSTING_SUCCESS,
                    data: response.data
                });
                dispatch(getItems())
            })
            .catch(function (error) {
                dispatch({
                    type: Type.ITEM_POSTING_FAILED
                });
            });
    }
}