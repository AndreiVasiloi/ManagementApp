import { FETCH_APPOINTMENT } from "./appointmentsConstants";

const initialState = {
  appointments: [],
};

export default function appointmentsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
      case FETCH_APPOINTMENT:
        return {
          ...state,
          appointments: payload,
        };
    default:
      return state;
  }
}
