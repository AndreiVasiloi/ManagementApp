import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentsListItem from "./AppointmentsListItem";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default function AppointmentsList({
  appointments,
  getNextAppointment,
  moreAppointments,
  loading,
}) {
  return (
    <Segment.Group className={classes.dashboardListContainer}>
      <Segment>
        {appointments.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextAppointment}
            hasMore={!loading && moreAppointments}
            initialLoad={false}
          >
            {appointments.map((appointment) => (
              <AppointmentsListItem
                appointment={appointment}
                key={appointment.id}
              />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </Segment.Group>
  );
}
