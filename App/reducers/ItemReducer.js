import immutable from 'seamless-immutable';
import { Type as ItemActionType } from '../actions/ItemActions';

const INITIAL_STATE = immutable({
    items: [],
    myItems: [],
    myDemandItems: [],
    itemsFetching: false,
    itemsFetchingFailed: false

});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case ItemActionType.GET_ITEMS_CALL:
            let itemsFetching = true;
            return state.merge({ itemsFetching });
            break;

        case ItemActionType.GET_ITEMS_SUCCESS:
            let items = action.data;
            itemsFetching = false;
            return state.merge({ items, itemsFetching });
            break;

        case ItemActionType.GET_ITEMS_FAILED:
            itemsFetching = false;
            itemsFetchingFailed = true;
            return state.merge({ items, itemsFetching, itemsFetchingFailed });
            break;


        default:
            return state;
    }
}