import { format } from "date-fns";
import { FETCH_APPOINTMENT } from "./appointmentsConstants";

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
