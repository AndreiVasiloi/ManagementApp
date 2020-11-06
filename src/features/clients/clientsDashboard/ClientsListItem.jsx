import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { deleteClientInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsListItem({ client }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserClient = client?.userUid === currentUser?.uid;
  // const getNameFirstLetters = client.name
  //   .split(" ")
  //   .map((i) => i.charAt(0).toUpperCase())
  //   .join("");

  async function handleCancelToggle(clientId) {
    setConfirmOpen(false);
    try {
      await deleteClientInFirestore(clientId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isCurrentUserClient && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment textAlign='center'>
            <Item.Group>
              <Grid>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>{client.name}</Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>
                    {client.phoneNumber}
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>{client.email}</Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={1}>
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
                        to={`/editClient/${client.id}`}
                        className={classes.edit}
                      >
                        <Icon name='edit' />
                        Edit Client
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={classes.delete}
                        onClick={() => setConfirmOpen(true)}
                      >
                        <Icon name='delete' />
                        Delete client
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>
            </Item.Group>
            <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
              <Modal.Body>
                Do you really want to delete this client?
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
                  onClick={() => handleCancelToggle(client.id)}
                >
                  Delete client
                </Button>
              </Modal.Footer>
            </Modal>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
