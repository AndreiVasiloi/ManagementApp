import { format } from "date-fns";
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
} from "./inventoryConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import { fetchSampleData } from "../../app/api/mockApi";

export function loadItems() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const items = await fetchSampleData();
      dispatch({ type: FETCH_ITEM, payload: items });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToItems(items) {
  const parsedItems = items.map((item) => ({
    ...item,
    displayPrice: item.price + " RON",
    displayExpirationDate: format(item.expirationDate, "MMMM d, yyyy"),
  }));

  return {
    type: FETCH_ITEM,
    payload: parsedItems,
  };
}

export function createItem(item) {
  return {
    type: CREATE_ITEM,
    payload: item,
  };
}

export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    payload: item,
  };
}

export function deleteItem(itemId) {
  return {
    type: DELETE_ITEM,
    payload: itemId,
  };
}
