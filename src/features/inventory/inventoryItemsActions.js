import { format } from "date-fns";
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
  LISTEN_TO_ITEMS_MONTH,
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

// import {
//   CREATE_ITEM,
//   UPDATE_ITEM,
//   DELETE_ITEM,
//   FETCH_ITEM,
//   LISTEN_TO_ITEMS_MONTH,
//   LISTEN_TO_SELECTED_ITEM,
//   CLEAR_ITEMS,
//   SET_SORT,
//   CLEAR_SELECTED_ITEM,
// } from "./inventoryConstants";
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError,
// } from "../../app/async/asyncReducer";
// import { fetchItemsFromFirestore } from "../../app/firestore/firestoreService";
// import { dataFromSnapshot } from "../../app/firestore/firestoreService";

// export function fetchItems(sort, limit, lastDocSnapshot) {
//   return async function (dispatch) {
//     dispatch(asyncActionStart());
//     try {
//       const snapshot = await fetchItemsFromFirestore(sort, limit, lastDocSnapshot).get(); 
//       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
//       const moreItems = snapshot.docs.length >= limit;
//       const items = snapshot.docs.map((doc) => dataFromSnapshot(doc));
//       dispatch({ type: FETCH_ITEM, payload: {items, moreItems, lastVisible} });
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       dispatch(asyncActionError(error));
//     }
//   };
// }

// export function clearSelectedItem() {
//   return {
//     type: CLEAR_SELECTED_ITEM,
//   };
// }

// export function setSort(value) {
//   return function(dispatch) {
//     dispatch(clearItems())
//     dispatch({type: SET_SORT, payload: value})
//   }
// }

// export function listenToSelectedItem(item) {
//   return {
//     type: LISTEN_TO_SELECTED_ITEM,
//     payload: item,
//   };
// }

// export function getItemsMonth(month) {
//   return {
//     type: LISTEN_TO_ITEMS_MONTH,
//     payload: month,
//   };
// }

// export function createItem(item) {
//   return {
//     type: CREATE_ITEM,
//     payload: item,
//   };
// }

// export function updateItem(item) {
//   return {
//     type: UPDATE_ITEM,
//     payload: item,
//   };
// }

// export function deleteItem(itemId) {
//   return {
//     type: DELETE_ITEM,
//     payload: itemId,
//   };
// }

// export function clearItems() {
//   return {
//     type: CLEAR_ITEMS,
//   };
// }
