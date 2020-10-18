import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
  LISTEN_TO_ITEMS_MONTH,
} from "./inventoryConstants";

const initialState = {
  items: [],
  itemsMonth: [],
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
        items: payload,
      };
    case LISTEN_TO_ITEMS_MONTH:
      return {
        ...state,
        itemsMonth: payload,
      };
    default:
      return state;
  }
}
