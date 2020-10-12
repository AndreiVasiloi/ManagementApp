import React, { useState } from "react";
import {
  Segment,
  Item,
  Grid,
  Icon,
  Popup,
  Label,
  Confirm,
} from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { Link } from "react-router-dom";
import { deleteItemInFirestore } from "../../../app/firestore/firestoreService";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function InventoryListItem({ item }) {
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserAppointment = item?.userUid === currentUser?.uid;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentDay = new Date();
  const itemExpirationDate = new Date(item.displayExpirationDate);
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
    {isCurrentUserAppointment && (
    <Segment.Group>
      <Segment textAlign='center' className={classes.inventoryItemContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.category}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.name}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.displayPrice}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  className={
                    checkIfExpired
                      ? `${classes.expirationDateRed}`
                      : checkIfIsAboutToExpire
                      ? `${classes.expirationDateRed}`
                      : `${classes.expirationDateBlack}`
                  }
                >
                  {checkIfExpired ? (
                    <Popup
                      content={item.displayExpirationDate}
                      trigger={<Label basic color='red' content='Expired' />}
                    />
                  ) : (
                    item.displayExpirationDate
                  )}
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.amount} / buc.</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={1}>
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
                    to={`/editItem/${item.id}`}
                    className={classes.edit}
                  >
                    <Icon name='edit' />
                    Edit Item
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setConfirmOpen(true)}
                    className={classes.delete}
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
          <Modal.Body>Do you really want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setConfirmOpen(false)}>
              Close
            </Button>
            <Button
              variant='danger'
              onClick={() => handleCancelToggle(item.id)}
            >
              Delete item
            </Button>
          </Modal.Footer>
        </Modal>
      </Segment>
    </Segment.Group>)}
    </>
  );
}
