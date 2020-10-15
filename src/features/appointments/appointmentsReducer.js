import {
  FETCH_APPOINTMENTS,
  LISTEN_TO_APPOINTMENTS_MONTH,
  LISTEN_TO_SELECTED_APPOINTMENT,
  CLEAR_SELECTED_APPOINTMENT,
  CLEAR_APPOINTMENTS,
  SET_START_DATE,
  RETAIN_STATE,
  SET_END_DATE
} from "./appointmentsConstants";

const initialState = {
  appointments: [],
  appointmentsMonth: [],
  moreAppointments: true,
  selectedAppointment: null,
  lastVisible: null,
  startDate: new Date(),
  endDate: new Date(),
  retainState: false,
};

export default function appointmentsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: [...state.appointments, ...payload.appointments],
        moreAppointments: payload.moreAppointments,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_APPOINTMENTS_MONTH:
      return {
        ...state,
        appointmentsMonth: payload,
      };
    case LISTEN_TO_SELECTED_APPOINTMENT:
      return {
        ...state,
        selectedAppointment: payload,
      };
    case CLEAR_SELECTED_APPOINTMENT:
      return {
        ...state,
        selectedAppointment: null,
      };
    case CLEAR_APPOINTMENTS:
      return {
        ...state,
        appointments: [],
        moreAppointments: true,
        lastVisible: null,
      };
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreAppointments: true,
        startDate: payload,
      };
      case SET_END_DATE:
        return {
          ...state,
          retainState: false,
          moreAppointments: true,
          endDate: payload,
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
