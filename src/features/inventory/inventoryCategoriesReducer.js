import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORY,
} from "./inventoryConstants";

const initialState = {
  categories: [],
};

export default function inventoryCategoriesReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter((cat) => cat.key !== payload.key),
          payload,
        ],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories.filter((cat) => cat.key !== payload)],
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
}
