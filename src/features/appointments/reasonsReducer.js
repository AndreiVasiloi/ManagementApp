import { FETCH_REASON } from "./appointmentsConstants";

const initialState = {
  reasons: [],
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
    default:
      return state;
  }
}
