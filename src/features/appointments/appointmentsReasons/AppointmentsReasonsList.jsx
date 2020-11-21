import React from "react";
import { Header, Segment } from "semantic-ui-react";
import AppointmentReasonsListItem from "./AppointmentsReasonsListItem";
import classes from "../../../css/Dashboard.module.css";
import AppointmentsReasonsListTitles from "./AppointmentsReasonsListTitles";

export default function AppointmentsReasonsList({ reasons, loading }) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <AppointmentsReasonsListTitles loading={loading} />
        {reasons.length > 0 ? (
          reasons.map((reason) => (
            <AppointmentReasonsListItem reason={reason} key={reason.id} />
          ))
        ) : (
          <Header
            size="huge"
            textAlign="center"
            color="teal"
            content="No reasons to display"
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
