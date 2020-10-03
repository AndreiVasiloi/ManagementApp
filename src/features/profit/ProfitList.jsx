import React from "react";
import { Segment } from "semantic-ui-react";
import ProfitListItem from "./ProfitListItem";
import classes from "../../css/Dashboard.module.css";

export default function ProfitList({ appointments }) {
  return (
    <Segment.Group style={{ marginTop: "50px" }}>
      <Segment className={classes.DashboardListContainer}>
        {appointments.map((appointment) => (
          <ProfitListItem appointment={appointment} key={appointment.id} />
        ))}
      </Segment>
    </Segment.Group>
  );
}
