import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
  LISTEN_TO_ITEMS_MONTH,
  LISTEN_TO_SELECTED_ITEM,
  CLEAR_ITEMS,
  SET_SORT,
  RETAIN_STATE,
  CLEAR_SELECTED_ITEM,
} from "./inventoryConstants";

const initialState = {
  items: [],
  itemsMonth: [],
  moreItems: true,
  selectedItem: null,
  lastVisible: null,
  sort: "expirationDate",
  retainState: false,
};

export default function inventoryItemsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((itm) => itm.id !== payload.id), payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((itm) => itm.id !== payload)],
      };
    case FETCH_ITEM:
      return {
        ...state,
        items: [...state.items, ...payload.items],
        moreItems: payload.moreItems,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_ITEMS_MONTH:
      return {
        ...state,
        itemsMonth: payload,
      };
    case LISTEN_TO_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: payload,
      };
    case CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: null,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
        moreItems: true,
        lastVisible: null,
      };
    case SET_SORT:
      return {
        ...state,
        retainState: false,
        moreItems: true,
        sort: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
