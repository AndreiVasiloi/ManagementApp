import {
  FETCH_REASON,
  FETCH_REASONS,
  CLEAR_SELECTED_REASON,
  LISTEN_TO_SELECTED_REASON,
  CLEAR_REASONS,
} from "./appointmentsConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  fetchReasonsFromFirestore,
} from "../../app/firestore/firestoreService";

export function fetchReasons(limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchReasonsFromFirestore(
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreReasons = snapshot.docs.length >= limit;
      const reasons = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_REASONS,
        payload: { reasons, moreReasons, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function clearSelectedReason() {
  return {
    type: CLEAR_SELECTED_REASON,
  };
}

export function listenToSelectedReason(category) {
  return {
    type: LISTEN_TO_SELECTED_REASON,
    payload: category,
  };
}

export function clearReasons() {
  return {
    type: CLEAR_REASONS,
  };
}

export function listenToReasons(reasons) {
  const parsedReasons = reasons.map((reason) => ({
    ...reason,
    displayPrice: reason.price + " RON",
  }));
  return {
    type: FETCH_REASON,
    payload: parsedReasons,
  };
}
