import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";

export default function AppointmentsList({ appointments }) {
  return (
    <Segment.Group style={{ marginTop: "50px" }}>
      <Segment>
        {appointments.map((appointment) => (
          <AppointmentsListItem
            appointment={appointment}
            key={appointment.id}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
}
