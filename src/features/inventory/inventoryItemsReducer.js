import {CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, FETCH_ITEM, LISTEN_TO_ITEMS_MONTH, LISTEN_TO_SELECTED_ITEM } from "./inventoryConstants";

const initialState = {
  items: [],
  itemsMonth: [],
  moreItems: false,
  selectedItem: null
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
        items: [...state.items.filter(itm => itm.id !== payload.id), payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter(itm => itm.id !== payload)],
      };
      case FETCH_ITEM:
        return {
          ...state,
          items: [...state.items, ...payload.items],
          moreItems: payload.moreItems
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
    default:
      return state;
  }
}
