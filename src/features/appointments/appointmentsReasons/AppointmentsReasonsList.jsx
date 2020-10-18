import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentReasonsListItem from "./AppointmentsReasonsListItem";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsReasonsList({ reasons }) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        {reasons.map((reason) => (
          <AppointmentReasonsListItem reason={reason} key={reason.id} />
        ))}
      </Segment>
    </Segment.Group>
  );
}
