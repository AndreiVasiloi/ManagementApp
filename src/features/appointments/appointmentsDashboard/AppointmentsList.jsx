import React from "react";
import { Header, Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";
import { format } from "date-fns";

export default function AppointmentsList({
  appointments,
  getNextAppointments,
  moreAppointments,
  loading,
  date,
  text
}) {
  const currentDay = new Date();
  const convertDate = new Date(date);
  const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

  const checkIfTomorrow = (first, second) =>{
    const checkDifference = second.getDate() - first.getDate();
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    checkDifference === 1;
  }

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
            <Header content= {`Today ${format(convertDate, "MMMM d, yyyy")}`} />
          ) : checkIfTomorrow(currentDay, convertDate) ? (
            <Header content= {`Tomorrow ${format(convertDate, "MMMM d, yyyy")}`} />
          ) : (
            <Header content={format(convertDate, "MMMM d, yyyy")} />
          )}
      <Segment>
      {filteredAppointments.map((appointment) => (
              <AppointmentsListItem
                appointment={appointment}
                key={appointment.id}
              />
            ))}
        {/* {filteredAppointments.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextAppointments}
            hasMore={!loading && moreAppointments}
            initialLoad={false}
          >
            {filteredAppointments.map((appointment) => (
              <AppointmentsListItem
                appointment={appointment}
                key={appointment.id}
              />
            ))}
          </InfiniteScroll>
        )} */}
      </Segment>
    </Segment.Group>
  );
}
