import { format } from "date-fns";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {
  fetchAppointmentsFromFirestore,
  dataFromSnapshot,
} from "../../app/firestore/firestoreService";
import {
  CLEAR_APPOINTMENTS,
  CLEAR_SELECTED_APPOINTMENT,
  FETCH_APPOINTMENTS,
  LISTEN_TO_APPOINTMENTS_MONTH,
  LISTEN_TO_SELECTED_APPOINTMENT,
  SET_END_DATE,
  SET_START_DATE,
} from "./appointmentsConstants";

export function fetchAppointments( startDate, endDate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchAppointmentsFromFirestore(
        startDate,
        endDate,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreAppointments = snapshot.docs.length >= limit;
      const appointments = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_APPOINTMENTS,
        payload: { appointments, moreAppointments, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearAppointments());
    dispatch({ type: SET_START_DATE, payload: date });
  };
}

export function setEndDate(date) {
  return function (dispatch) {
    dispatch(clearAppointments());
    dispatch({ type: SET_END_DATE, payload: date });
  };
}

export function listenToSelectedAppointment(appointment) {
  return {
    type: LISTEN_TO_SELECTED_APPOINTMENT,
    payload: appointment,
  };
}

export function clearSelectedAppointment() {
  return {
    type: CLEAR_SELECTED_APPOINTMENT,
  };
}

export function clearAppointments() {
  return {
    type: CLEAR_APPOINTMENTS,
  };
}

export function listenToAppointments(appointments) {
  const parsedAppointments = appointments.map((appointment) => ({
    ...appointment,
    displayHour: format(appointment.hour, "HH:mm"),
    displayAppointmentDate: format(appointment.date, "MMMM d, yyyy"),
  }));

  return {
    type: FETCH_APPOINTMENTS,
    payload: parsedAppointments,
  };
}

export function getAppointmentsMonth(month) {
  return {
    type: LISTEN_TO_APPOINTMENTS_MONTH,
    payload: month,
  };
}
