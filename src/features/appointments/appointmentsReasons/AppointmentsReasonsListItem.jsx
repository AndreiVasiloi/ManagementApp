import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { deleteReasonInFirestore } from "../../../app/firestore/firestoreService";
import classes from '../../../css/Dashboard.module.css';

export default function AppointmentsReasonsListItem({ reason }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleCancelToggle(itemId) {
    setConfirmOpen(false);
    try {
      await deleteReasonInFirestore(itemId);
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <Segment.Group>
        <Segment textAlign='center' className={classes.inventoryItemContainer}>
          <Item.Group>
            <Grid>
              <Grid.Column width={14}>
                <Item>
                  <Item.Content>{reason.text}</Item.Content>
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
                    as={Link} to={`/editReason/${reason.id}`}
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
          <Modal.Body>Do you really want to delete this reason?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setConfirmOpen(false)}>
              Close
            </Button>
            <Button
              variant='danger'
              onClick={() => handleCancelToggle(reason.id)}
            >
              Delete item
            </Button>
          </Modal.Footer>
        </Modal>
        </Segment>
      </Segment.Group>
  );
}
