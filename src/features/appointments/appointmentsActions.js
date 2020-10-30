import { format } from "date-fns";
import {
  FETCH_APPOINTMENTS,
  LISTEN_TO_APPOINTMENTS_MONTH,
  LISTEN_TO_APPOINTMENTS_YEAR,
  LISTEN_TO_APPOINTMENTS_CUSTOM_DATES
} from "./appointmentsConstants";

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

export function getAppointmentsYear(year) {
  return {
    type: LISTEN_TO_APPOINTMENTS_YEAR,
    payload: year,
  };
}


export function getAppointmentsCustomDate(customDate) {
  return {
    type: LISTEN_TO_APPOINTMENTS_CUSTOM_DATES,
    payload: customDate,
  };
}