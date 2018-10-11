import immutable from 'seamless-immutable';
import { Type as ItemActionType } from '../actions/ItemActions';

const INITIAL_STATE = immutable({
    item: {
        name: '',
        description: '',
        price: '',
        location: '',
        documents: {},
    },
    itemDetail: {},
    itemDetailFetching: false,
    itemDetailFetchingFailed: false,
    itemPosting: false,
    itemPostingSuccess: false,
    itemPostingFailed: false,
    items: [],
    myItems: [],
    myDemandItems: [],
    itemsFetching: false,
    itemsFetchingFailed: false

});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case ItemActionType.SET_INITIAL_STATE:
            let componentToSetInitialState = {};
            let value = INITIAL_STATE[action.data];
            componentToSetInitialState[action.data] = value;
            return state.merge({ ...componentToSetInitialState });
            break;

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

        case ItemActionType.SET_ITEM_PROPERTY: {
            let item = state.item.asMutable();
            item[action.name] = action.value;
            return state.merge({ item: item });
            break;
        }

        case ItemActionType.ITEM_POSTING_CALL: {
            let itemPosting = true;
            return state.merge({ itemPosting });
            break;
        }

        case ItemActionType.ITEM_POSTING_SUCCESS: {
            let itemPosting = false;
            let itemPostingSuccess = true;
            return state.merge({ itemPosting, itemPostingSuccess, item: INITIAL_STATE.item });
            break;
        }

        case ItemActionType.ITEM_POSTING_FAILED: {
            let itemPosting = false;
            let itemPostingFailed = true;
            return state.merge({ itemPosting, itemPostingFailed });
            break;
        }
        case ItemActionType.SET_ITEM_DOC:
            let doc = action.doc;
            itemm = immutable.asMutable(state.item, { deep: true });
            itemm.documents = doc;
            return state.merge({ item: itemm });
            break;

        case ItemActionType.GET_ITEM_BY_ID_CALL:
            itemDetailFetching = true;
            return state.merge({ itemDetailFetching });
            break;

        case ItemActionType.GET_ITEM_BY_ID_SUCCESS:
            itemDetail = action.data;
            itemDetailFetching = false;
            return state.merge({ itemDetail, itemDetailFetching });
            break;

        case ItemActionType.GET_ITEM_BY_ID_FAILED:
            let itemDetailFetching = false;
            let itemDetailFetchingFailed = true;
            return state.merge({ itemDetailFetching, itemDetailFetchingFailed });
            break;


        default:
            return state;
    }
}