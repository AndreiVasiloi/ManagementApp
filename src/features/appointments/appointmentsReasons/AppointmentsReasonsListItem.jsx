import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon, Item, Segment } from "semantic-ui-react";
import { deleteReasonInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsReasonsListItem({ reason }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserReasons = reason?.userUid === currentUser?.uid;

  async function handleCancelToggle(itemId) {
    setConfirmOpen(false);
    try {
      await deleteReasonInFirestore(itemId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isCurrentUserReasons && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment
            textAlign="center"
            className={classes.inventoryItemContainer}
          >
            <Item.Group>
              <Container fluid>
                <Row>
                  <Col lg={4} xs={4} className={classes.reasonsContent}>
                    <Item>
                      <Item.Content className={classes.reasonsContentText}>{reason.text}</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={3} xs={2} className={classes.reasonsContent}>
                    <Item className={classes.appointmentsReasonColor}>
                      <Item.Content>
                        <div
                        className={classes.appointmentsReasonColorDisplay}
                          style={{
                            margin: '0 auto',
                            width: "20px",
                            height: "20px",
                            backgroundColor: `${reason.reasonColor.hex}`,
                          }}
                        ></div>
                      </Item.Content>
                    </Item>
                  </Col>
                  <Col lg={4} xs={4} className={classes.reasonsContent}>
                    <Item>
                      <Item.Content className={classes.reasonsContentText} >{reason.price} RON</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={1} xs={1}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        className={classes.DashboardDropdownButton}
                      >
                        <Icon name="ellipsis horizontal" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/editReason/${reason.id}`}
                          className={classes.edit}
                        >
                          <Icon name="edit" />
                          Edit Reason
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={classes.delete}
                          onClick={() => setConfirmOpen(true)}
                        >
                          <Icon name="delete" />
                          Delete Reason
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Container>
            </Item.Group>
            <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
              <Modal.Body>Do you really want to delete this reason?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCancelToggle(reason.id)}
                >
                  Delete reason
                </Button>
              </Modal.Footer>
            </Modal>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
