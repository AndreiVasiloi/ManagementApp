import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";
import classes from "../../../css/Dashboard.module.css";
import { format } from "date-fns";

export default function AppointmentsList({ appointments, date, text }) {
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

  const textLowered = text.trim().toLowerCase();
  const filteredAppointments =
    text === ""
      ? appointments
      : appointments.filter((appointment) =>
          handleFilter(appointment, textLowered)
        );

  function handleFilter(appointment, text) {
    const keys = Object.keys(appointment).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = appointment[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

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
        {filteredAppointments.map((appointment) => (
          <AppointmentsListItem
            appointment={appointment}
            key={appointment.id}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
}
