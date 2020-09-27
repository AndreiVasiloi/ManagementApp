import { FETCH_REASON } from "./appointmentsConstants";
// import {
//     // CREATE_CATEGORY,
//     // UPDATE_CATEGORY,
//     // DELETE_CATEGORY,
//     //FETCH_CATEGORY,
//   } from "./inventoryConstants";
  
  export function listenToReasons(reasons) {
    return {
      type: FETCH_REASON,
      payload: reasons,
    };
  }
  
//   export function createCategory(category) {
//     return {
//       type: CREATE_CATEGORY,
//       payload: category,
//     };
//   }
  
//   export function updateCategory(category) {
//     return {
//       type: UPDATE_CATEGORY,
//       payload: category,
//     };
//   }
  
//   export function deleteCategory(categoryId) {
//     return {
//       type: DELETE_CATEGORY,
//       payload: categoryId,
//     };
//   }
  