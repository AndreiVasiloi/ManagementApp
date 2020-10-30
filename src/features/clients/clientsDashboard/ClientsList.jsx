import React from "react";
import { Segment } from "semantic-ui-react";
import ClientsListItem from "./ClientsListItem";
import classes from "../../../css/Dashboard.module.css";
import ClientsListTitles from "./ClientsListTitles";

export default function ClientsList({ clients }) {
  return (
    <Segment.Group
      className={classes.dashboardListContainer}
      style={{ marginTop: "50px" }}
    >
      <Segment>
        <ClientsListTitles />
        {clients.map((client) => (
          <ClientsListItem client={client} key={client.id} />
        ))}
      </Segment>
    </Segment.Group>
  );
}
