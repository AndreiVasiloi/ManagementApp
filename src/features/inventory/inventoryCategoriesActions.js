import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORY,
} from "./inventoryConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import {  fetchCategoryOptions } from "../../app/api/mockApiCategories";

export function loadCategories() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const categories = await fetchCategoryOptions();
      dispatch({ type: FETCH_CATEGORY, payload: categories });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToCategories(categories) {
  return {
    type: FETCH_CATEGORY,
    payload: categories,
  };
}

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    payload: category,
  };
}

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  };
}

export function deleteCategory(categoryId) {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId,
  };
}
