import { format } from "date-fns";
import { FETCH_APPOINTMENT } from "./appointmentsConstants";

export function listenToAppointments(appointments) {
    const parsedAppointments = appointments.map((appointment) => ({
        ...appointment,
        displayDate: format(appointment.hour, "HH:mm"),
      }));

    return {
      type: FETCH_APPOINTMENT,
      payload: parsedAppointments,
    };
  }
