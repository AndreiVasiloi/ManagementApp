import {
  FETCH_APPOINTMENTS,
  LISTEN_TO_APPOINTMENTS_MONTH,
  LISTEN_TO_APPOINTMENTS_YEAR,
  LISTEN_TO_APPOINTMENTS_CUSTOM_DATES
} from "./appointmentsConstants";

const initialState = {
  appointments: [],
  appointmentsMonth: [],
  appointmentsYear: [],
  appointmentsCustomDate: []
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
      case LISTEN_TO_APPOINTMENTS_YEAR:
        return {
          ...state,
          appointmentsYear: payload,
        };
        case LISTEN_TO_APPOINTMENTS_CUSTOM_DATES:
          return {
            ...state,
            appointmentsCustomDate: payload,
          };
    default:
      return state;
  }
}
