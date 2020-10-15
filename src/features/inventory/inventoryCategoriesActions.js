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


// import {
//   CREATE_CATEGORY,
//   UPDATE_CATEGORY,
//   DELETE_CATEGORY,
//   FETCH_CATEGORIES,
//   CLEAR_SELECTED_CATEGORY,
//   LISTEN_TO_SELECTED_CATEGORY,
//   CLEAR_CATEGORIES,
//   FETCH_CATEGORY,
// } from "./inventoryConstants";
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError,
// } from "../../app/async/asyncReducer";
// import {  fetchCategoryOptions } from "../../app/api/mockApiCategories";
// import { dataFromSnapshot, fetchCategoriesFromFirestore } from "../../app/firestore/firestoreService";

// export function fetchCategories( limit, lastDocSnapshot) {
//   return async function (dispatch) {
//     dispatch(asyncActionStart());
//     try {
//       const snapshot = await fetchCategoriesFromFirestore(
//         limit,
//         lastDocSnapshot
//       ).get();
//       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
//       const moreCategories = snapshot.docs.length >= limit;
//       const categories = snapshot.docs.map((doc) => dataFromSnapshot(doc));
//       dispatch({
//         type: FETCH_CATEGORIES,
//         payload: { categories, moreCategories, lastVisible },
//       });
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       dispatch(asyncActionError(error));
//     }
//   };
// }

// export function loadCategories() {
//   return async function (dispatch) {
//     dispatch(asyncActionStart());
//     try {
//       const categories = await fetchCategoryOptions();
//       dispatch({ type: FETCH_CATEGORY, payload: categories });
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       dispatch(asyncActionError(error));
//     }
//   };
// }

// export function clearSelectedCategory() {
//   return {
//     type: CLEAR_SELECTED_CATEGORY,
//   };
// }

// export function listenToSelectedCategory(category) {
//   return {
//     type: LISTEN_TO_SELECTED_CATEGORY,
//     payload: category,
//   };
// }

// export function listenToCategories(categories) {
//   return {
//     type: FETCH_CATEGORY,
//     payload: categories,
//   };
// }

// export function clearCategories() {
//   return {
//     type: CLEAR_CATEGORIES,
//   };
// }


// export function createCategory(category) {
//   return {
//     type: CREATE_CATEGORY,
//     payload: category,
//   };
// }

// export function updateCategory(category) {
//   return {
//     type: UPDATE_CATEGORY,
//     payload: category,
//   };
// }

// export function deleteCategory(categoryId) {
//   return {
//     type: DELETE_CATEGORY,
//     payload: categoryId,
//   };
// }
