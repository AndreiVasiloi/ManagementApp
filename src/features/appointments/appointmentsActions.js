import { format } from "date-fns";
import { FETCH_APPOINTMENT, LISTEN_TO_APPOINTMENTS_MONTH } from "./appointmentsConstants";

export function listenToAppointments(appointments) {
    const parsedAppointments = appointments.map((appointment) => ({
        ...appointment,
        displayHour: format(appointment.hour, "HH:mm"),
        displayAppointmentDate: format(appointment.date, "MMMM d, yyyy"),
      }));

    return {
      type: FETCH_APPOINTMENT,
      payload: parsedAppointments,
    };
  }

  export function getAppointmentsMonth(month) {
    return {
      type: LISTEN_TO_APPOINTMENTS_MONTH,
      payload: month,
    };
  }