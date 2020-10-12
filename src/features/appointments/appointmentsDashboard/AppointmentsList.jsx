import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";
import classes from '../../../css/Dashboard.module.css';

export default function AppointmentsList({ appointments }) {
  return (
    <Segment.Group className={classes.DashboardListContainer}>
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
