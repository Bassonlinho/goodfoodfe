import axios from '../utils/AxiosWrapper';
import { config } from '../config/config';
import mime from 'react-native-mime-types';
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
    SET_ITEM_DOC: 'SET_ITEM_DOC',
    UPLOAD_PICTURE_SUCCESS: 'UPLOAD_PICTURE_SUCCESS',
    UPLOAD_PICTURE_FAILED: 'UPLOAD_PICTURE_FAILED',

    GET_ITEM_BY_ID_CALL: 'GET_ITEM_BY_ID_CALL',
    GET_ITEM_BY_ID_SUCCESS: 'GET_ITEM_BY_ID_SUCCESS',
    GET_ITEM_BY_ID_FAILED: 'GET_ITEM_BY_ID_FAILED',
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
                    data: response.data.data
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

        axios.post(serverUrl + '/api/item/create', item)
            .then(function (response) {
                dispatch({
                    type: Type.ITEM_POSTING_SUCCESS,
                    data: response.data
                });
                if (!!item.documents && item.documents.length != 0) {
                    var data = new FormData();
                    data.append('document', {
                        uri: item.documents.uri,
                        name: item.documents.fileName,
                        type: mime.lookup(item.documents.path),
                    });

                    data.append('itemId', response.data.data.id);

                    axios({
                        url: serverUrl + `/api/item/upload_picture`,
                        method: 'POST',
                        onUploadProgress: function (progressEvent) {
                            console.log('wwww', Math.round((progressEvent.loaded * 100) / progressEvent.total));
                        },
                        data: data,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(function (res) {
                        console.log('resssssssss', res);
                        dispatch({
                            type: Type.UPLOAD_PICTURE_SUCCESS
                        });
                    })
                        .catch(function (err) {
                            console.log('errrrrr ', err);
                            dispatch({
                                type: Type.UPLOAD_PICTURE_FAILED
                            });
                        });
                }
                dispatch(getItems())
            })
            .catch(function (error) {
                console.log('ERRRRRRRRRRRRRRRRR ', error);
                dispatch({
                    type: Type.ITEM_POSTING_FAILED
                });
            });
    }
}
export function setItemDoc(doc) {
    return (dispatch) => {
        dispatch({
            type: Type.SET_ITEM_DOC,
            doc: doc
        })
    }
}

export function getItemById(id) {
    return (dispatch) => {
        dispatch({
            type: Type.GET_ITEM_BY_ID_CALL
        });
        return axios.get(serverUrl + '/api/item/getById?id=' + id)
            .then(function (response) {
                console.log('rrrrrrrrrrr', response)
                dispatch({
                    type: Type.GET_ITEM_BY_ID_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: Type.GET_ITEM_BY_ID_FAILED
                });
            });
    }
}