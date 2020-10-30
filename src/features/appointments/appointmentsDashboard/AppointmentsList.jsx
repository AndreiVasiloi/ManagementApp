import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";
import classes from "../../../css/Dashboard.module.css";
import { format } from "date-fns";

export default function AppointmentsList({ appointments, date }) {
  const currentDay = new Date();
  const convertDate = new Date(date);
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const checkIfTomorrow = (first, second) => {
    const checkDifference = second.getDate() - first.getDate();
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      checkDifference === 1
    );
  };

  return (
    <Segment.Group className={classes.dashboardListContainer}>
      {datesAreOnSameDay(currentDay, convertDate) ? (
        <div className={classes.headerDateContainer}>
          <h5>Today</h5>
          <h5>{`${format(convertDate, "MMMM d")}`}</h5>
        </div>
      ) : checkIfTomorrow(currentDay, convertDate) ? (
        <div className={classes.headerDateContainer}>
          <h5>Tomorrow</h5>
          <h5>{`${format(convertDate, "MMMM d")}`}</h5>
        </div>
      ) : (
        <div className={classes.headerDateContainer}>
          <h5 style={{ visibility: "hidden" }}>text</h5>
          <h5>{`${format(convertDate, "MMMM d")}`}</h5>
        </div>
      )}
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
