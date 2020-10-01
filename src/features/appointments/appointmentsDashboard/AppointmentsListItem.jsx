import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { deleteAppointmentInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsListItem({ appointment }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentDay = new Date();
  const appointmentDate = new Date(appointment.displayAppointmentDate);
  const dateDifferenceInTime =
  appointmentDate.getTime() - currentDay.getTime();
  const getNameFirstLetters = appointment.name
    .split(" ")
    .map((i) => i.charAt(0).toUpperCase())
    .join("");

  async function handleCancelToggle(itemId) {
    setConfirmOpen(false);
    try {
      await deleteAppointmentInFirestore(itemId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Segment.Group>
      {dateDifferenceInTime === 2347499885 ? (
        <Header content= {`Today ${appointment.displayAppointmentDate}`} />
      ) : (
        <Header content={appointment.displayAppointmentDate} />
      )}

      <Segment textAlign='center'>
        <Item.Group>
          <Grid>
            <Grid.Column width={2} className={classes.hour}>
              <Item>
                <Icon name='clock outline' />
                <Item.Content>{appointment.displayHour}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>
                  <Label size='big'>{getNameFirstLetters}</Label>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={5}>
              <Item className={classes.appointmentsName}>
                <Item.Content>{appointment.name}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>
                  <Item.Header>REASON</Item.Header>
                  {appointment.reason}
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={4}>
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
                    onClick={() => setConfirmOpen(true)}
                  >
                    <Icon name='delete' />
                    Delete Item
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </Item.Group>
        <Modal show={confirmOpen}>
          <Modal.Body>
            Do you really want to delete this appointment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setConfirmOpen(false)}>
              Close
            </Button>
            <Button
              variant='danger'
              onClick={() => handleCancelToggle(appointment.id)}
            >
              Delete item
            </Button>
          </Modal.Footer>
        </Modal>
      </Segment>
    </Segment.Group>
  );
}
