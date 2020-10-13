import { format } from "date-fns";
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
  LISTEN_TO_ITEMS_MONTH,
  LISTEN_TO_SELECTED_ITEM,
} from "./inventoryConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import { fetchItemsFromFirestore } from "../../app/firestore/firestoreService";
import { dataFromSnapshot } from "../../app/firestore/firestoreService";

export function fetchItems(predicate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchItemsFromFirestore(predicate, limit, lastDocSnapshot).get(); 
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreItems = snapshot.docs.length >= limit;
      const items = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({ type: FETCH_ITEM, payload: {items, moreItems} });
      dispatch(asyncActionFinish());
      return lastVisible;
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedItem(item) {
  // const parsedItems = item.map((item) => ({
  //   ...item,
  //   displayPrice: item.price + " RON",
  //   displayExpirationDate: format(item.expirationDate, "MMMM d, yyyy"),
  // }));

  return {
    type: LISTEN_TO_SELECTED_ITEM,
    payload: item,
  };
}

export function getItemsMonth(month) {
  return {
    type: LISTEN_TO_ITEMS_MONTH,
    payload: month,
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
