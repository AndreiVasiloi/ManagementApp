import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import { deleteAppointmentInFirestore, listenToReasonsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "../../../css/Dashboard.module.css";
import { listenToReasons } from "../reasonsActions";

export default function AppointmentsListItem({ appointment }) {
  const dispatch = useDispatch();
  const reasons = useSelector((state) => state.reason.reasons);
  const findAppointmentReason = reasons.filter(reason => reason.value === appointment.reason);
  const getReasonColor = findAppointmentReason.map(app => app.reasonColor.hex);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserAppointment = appointment?.userUid === currentUser?.uid;
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


    useFirestoreCollection({
      query: () => listenToReasonsFromFirestore(),
      data: (reasons) => dispatch(listenToReasons(reasons)),
      deps: [dispatch],
    });

  return (
    <>
      {isCurrentUserAppointment && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment textAlign='center'>
            <Item.Group>
              <Grid>
                <Grid.Column width={2} className={classes.hour}>
                  <Item>
                    <Icon name='clock outline' className={classes.clockIcon} />
                    <Item.Content>{format(appointment.hour, "HH:mm")}</Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Item>
                    <Item.Content>
                      <Label size='big'>{getNameFirstLetters}</Label>
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Item className={classes.appointmentsName}>
                    <Item.Content>{appointment.name}</Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Item>
                    <Item.Content>
                      <Item.Header className={classes.reasonHeader}>REASON</Item.Header>
                      <Item.Description
                        style={{ color: `${getReasonColor}` }}
                      >
                        {appointment.reason}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={2}>
                  <Dropdown className={classes.itemDropdown}>
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
                <Button
                  variant='secondary'
                  onClick={() => setConfirmOpen(false)}
                >
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
      )}
    </>
  );
}
