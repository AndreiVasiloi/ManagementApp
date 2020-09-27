// import {CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, FETCH_CATEGORY } from "./inventoryConstants";

import { FETCH_REASON } from "./appointmentsConstants";

const initialState = {
  reasons: [],
};

export default function reasonsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    // case CREATE_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories, payload],
    //   };
    // case UPDATE_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories.filter(cat => cat.key !== payload.key), payload],
    //   };
    // case DELETE_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories.filter(cat => cat.key !== payload)],
    //   };
      case FETCH_REASON:
        return {
          ...state,
          reasons: payload,
        };
    default:
      return state;
  }
}
