import React from "react";
import { Placeholder, Segment } from "semantic-ui-react";
import AppointmentsPlaceholderList from "./PlaceholderList";

export default function AppointmentsPlaceholder() {
  return (
    <Placeholder fluid style={{ marginTop: "30px" }}>
      <Segment.Group>
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
        <AppointmentsPlaceholderList />
      </Segment.Group>
    </Placeholder>
  );
}
