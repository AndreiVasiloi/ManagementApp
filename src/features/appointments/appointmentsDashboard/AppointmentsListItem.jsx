import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon, Item, Label, Segment } from "semantic-ui-react";
import {
  deleteAppointmentInFirestore,
  listenToReasonsFromFirestore,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "../../../css/Dashboard.module.css";
import { listenToReasons } from "../reasonsActions";

export default function AppointmentsListItem({ appointment }) {
  const dispatch = useDispatch();
  const reasons = useSelector((state) => state.reason.reasons);
  const findAppointmentReason = reasons.filter(
    (reason) => reason.value === appointment.reason
  );
  const getReasonColor = findAppointmentReason.map(
    (app) => app.reasonColor.hex
  );
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
          <Segment textAlign="center">
            <Item.Group>
              <Container fluid>
                <Row>
                  <Col lg={1} xs={4} md={2} className={classes.hour}>
                    <Item className={classes.hourItem}>
                      <Icon
                        name="clock outline"
                        className={classes.clockIcon}
                      />
                      <Item.Content>
                        {format(appointment.hour, "HH:mm")}
                      </Item.Content>
                    </Item>
                  </Col>
                  <Col lg={1} xs={4} md={1}>
                    <Item className={classes.labelItem}>
                      <Item.Content>
                        <Label size="big" className={classes.label}>{getNameFirstLetters}</Label>
                      </Item.Content>
                    </Item>
                  </Col>
                  <Col lg={2} xs={4} md={5} className={classes.appointmentsNameContainer}>
                    <Item className={classes.appointmentsName}>
                      <Item.Content className={classes.appointmentsNameContent}>{appointment.name}</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={7} xs={4} md={3} className={classes.appointmentsReasonContainer}>
                    <Item>
                      <Item.Content>
                        <Item.Header className={classes.reasonHeader}>
                          REASON
                        </Item.Header>
                        <Item.Description
                        className={classes.reasonHeaderText}
                          style={{ color: `${getReasonColor}` }}
                        >
                          {appointment.reason}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Col>
                  <Col lg={1} xs={8} md={1} className={classes.appointmentsModalContainer}>
                    <Dropdown className={classes.itemDropdown}>
                      <Dropdown.Toggle
                        variant="success"
                        className={classes.DashboardDropdownButton}
                      >
                        <Icon name="ellipsis horizontal" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/editAppointment/${appointment.id}`}
                          className={classes.edit}
                        >
                          <Icon name="edit" />
                          Edit Appointment
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={classes.delete}
                          onClick={() => setConfirmOpen(true)}
                        >
                          <Icon name="delete" />
                          Delete Appointment
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Container>
            </Item.Group>
            <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
              <Modal.Body>
                Do you really want to delete this appointment?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCancelToggle(appointment.id)}
                >
                  Delete appointment
                </Button>
              </Modal.Footer>
            </Modal>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
