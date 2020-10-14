import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES,
  CLEAR_SELECTED_CATEGORY,
  CLEAR_CATEGORIES,
  RETAIN_STATE,
  FETCH_CATEGORY
} from "./inventoryConstants";

const initialState = {
  categories: [],
  moreCategories: true,
  selectedCategory: null,
  lastVisible: null,
  retainState: false,
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
    // case FETCH_CATEGORIES:
    //   return {
    //     ...state,
    //     categories: [...state.categories, ...payload.categories],
    //     moreCategories: payload.moreCategories,
    //     lastVisible: payload.lastVisible,
    //   };
      case FETCH_CATEGORY:
        return {
          ...state,
          categories: payload,
        };
    case CLEAR_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: null,
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        moreCategories: true,
        lastVisible: null,
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
