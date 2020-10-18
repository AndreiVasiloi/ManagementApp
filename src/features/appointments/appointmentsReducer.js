import {
  FETCH_APPOINTMENTS,
  LISTEN_TO_APPOINTMENTS_MONTH,
} from "./appointmentsConstants";

const initialState = {
  appointments: [],
  appointmentsMonth: [],
};

export default function appointmentsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case LISTEN_TO_APPOINTMENTS_MONTH:
      return {
        ...state,
        appointmentsMonth: payload,
      };
    default:
      return state;
  }
}
