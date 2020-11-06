import React from "react";
import { Header, Segment } from "semantic-ui-react";
import AppointmentReasonsListItem from "./AppointmentsReasonsListItem";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsReasonsList({ reasons }) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        {reasons.length > 0 ? (
          reasons.map((reason) => (
            <AppointmentReasonsListItem reason={reason} key={reason.id} />
          ))
        ) : (
          <Header
            size='huge'
            textAlign='center'
            color='teal'
            content='No reasons to display'
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
