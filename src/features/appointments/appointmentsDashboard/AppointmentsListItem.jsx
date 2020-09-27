import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import { deleteAppointmentInFirestore } from "../../../app/firestore/firestoreService";
import classes from "./AppointmentsDashboard.module.css";

export default function AppointmentsListItem({ appointment }) {
  return (
    <Segment.Group>
      <Segment textAlign="center">
        <Item.Group>
          <Grid>
            <Grid.Column width={2} className={classes.hour}>
              <Item>
                <Item.Content>{appointment.displayDate}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>
                  <Label size="big">AV</Label>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{appointment.name}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>
                  <Item.Header>reason</Item.Header>
                  {appointment.reason}
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={8}>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  <Icon name="ellipsis horizontal" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/editAppointment/${appointment.id}`}
                  >
                    <Icon name="edit" />
                    Edit Item
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => deleteAppointmentInFirestore(appointment.id)}
                  >
                    <Icon name="delete" />
                    Delete Item
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
