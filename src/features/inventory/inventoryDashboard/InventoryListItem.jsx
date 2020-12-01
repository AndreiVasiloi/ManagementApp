import React, { useState } from "react";
import { Segment, Item, Icon, Popup, Label } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { Link } from "react-router-dom";
import { deleteItemInFirestore } from "../../../app/firestore/firestoreService";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export default function InventoryListItem({ item }) {
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserInventory = item?.userUid === currentUser?.uid;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentDay = new Date();
  const itemExpirationDate = new Date(item.expirationDate);
  const expirationDateDifferenceInTime =
    itemExpirationDate.getTime() - currentDay.getTime();
  const expirationDateDifferenceInDays = Math.floor(
    expirationDateDifferenceInTime / (1000 * 3600 * 24) + 1
  );
  const checkIfIsAboutToExpire = expirationDateDifferenceInDays <= 7;
  const checkIfExpired = expirationDateDifferenceInDays < 0;

  async function handleCancelToggle(itemId) {
    setConfirmOpen(false);
    try {
      await deleteItemInFirestore(itemId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isCurrentUserInventory && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment textAlign="center">
            <Item.Group>
              <Container fluid >
                <Row>
                  <Col lg={3} xs={3}>
                    <Item>
                      <Item.Content className={classes.inventoryText}>{item.category}</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={3} xs={3}>
                    <Item>
                      <Item.Content className={classes.inventoryText}>{item.name}</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={3} xs={2}>
                    <Item>
                      <Item.Content
                        className={
                          checkIfExpired
                            ? `${classes.expirationDateRed} ${classes.inventoryText}`
                            : checkIfIsAboutToExpire
                            ? `${classes.expirationDateRed} ${classes.inventoryText}`
                            : `${classes.expirationDateBlack} ${classes.inventoryText}`
                        }
                      >
                        {checkIfExpired ? (
                          <Popup
                            content={format(item.expirationDate, "MMMM d, yyyy")}
                            trigger={
                              <Label basic color="red" content="Expired" className={classes.inventoryLabel}/>
                            }
                          />
                        ) : (
                          format(item.expirationDate, "MMMM d, yyyy")
                        )}
                      </Item.Content>
                    </Item>
                  </Col>
                  <Col lg={2} xs={2}>
                    <Item className={classes.inventoryAmountText}>
                      <Item.Content className={classes.inventoryText}>{item.amount}</Item.Content>
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
                          to={`/editItem/${item.id}`}
                          className={classes.edit}
                        >
                          <Icon name="edit" />
                          Edit Item
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setConfirmOpen(true)}
                          className={classes.delete}
                        >
                          <Icon name="delete" />
                          Delete Item
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Container>
            </Item.Group>
            <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
              <Modal.Body>Do you really want to delete this item?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCancelToggle(item.id)}
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
