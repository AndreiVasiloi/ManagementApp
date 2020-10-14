import {
  FETCH_REASON,
  FETCH_REASONS,
  LISTEN_TO_SELECTED_REASON,
  CLEAR_SELECTED_REASON,
  CLEAR_REASONS,
  RETAIN_STATE,
} from "./appointmentsConstants";

const initialState = {
  reasons: [],
  moreReasons: true,
  selectedReason: null,
  lastVisible: null,
  retainState: false,
};

export default function reasonsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_REASON:
      return {
        ...state,
        reasons: payload,
      };
    case FETCH_REASONS:
      return {
        ...state,
        reasons: [...state.reasons, ...payload.reasons],
        moreReasons: payload.moreReasons,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_SELECTED_REASON:
      return {
        ...state,
        selectedReason: payload,
      };
    case CLEAR_SELECTED_REASON:
      return {
        ...state,
        selectedReason: null,
      };
    case CLEAR_REASONS:
      return {
        ...state,
        reasons: [],
        moreReasons: true,
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
