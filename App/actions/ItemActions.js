import axios from '../utils/AxiosWrapper';
import { config } from '../config/config';

const serverUrl = config.serverUrl;
export const Type = {
    GET_ITEMS_CALL: 'GET_ITEMS_CALL',
    GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS',
    GET_ITEMS_FAILED: 'GET_ITEMS_FAILED',

};


export function getItems() {
    return (dispatch) => {
        dispatch({
            type: Type.GET_ITEMS_CALL
        });

        axios.get(serverUrl + '/api/item/read')
            .then(function (response) {
                console.log('ddddd', response.data);
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
