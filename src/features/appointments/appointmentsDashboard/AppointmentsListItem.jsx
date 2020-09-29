import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import { deleteAppointmentInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsListItem({ appointment }) {
  const getNameFirstLetters = appointment.name
    .split(" ")
    .map((i) => i.charAt(0).toUpperCase())
    .join("");
  return (
    <Segment.Group>
      <Segment textAlign='center'>
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
                  <Label size='big'>{getNameFirstLetters}</Label>
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
                <Dropdown.Toggle
                  variant='success'
                  className={classes.DashboardDropdownButton}
                >
                  <Icon name='ellipsis horizontal' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/editAppointment/${appointment.id}`}
                    className={classes.edit}
                  >
                    <Icon name='edit' />
                    Edit Item
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={classes.delete}
                    onClick={() => deleteAppointmentInFirestore(appointment.id)}
                  >
                    <Icon name='delete' />
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
