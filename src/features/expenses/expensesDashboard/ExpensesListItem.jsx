import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { deleteExpenseInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsListItem({ expense }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserExpense = expense?.userUid === currentUser?.uid;
  // const getNameFirstLetters = client.name
  //   .split(" ")
  //   .map((i) => i.charAt(0).toUpperCase())
  //   .join("");

  async function handleCancelToggle(expenseId) {
    setConfirmOpen(false);
    try {
      await deleteExpenseInFirestore(expenseId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isCurrentUserExpense && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment textAlign='center'>
            <Item.Group>
              <Grid>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>{expense.name}</Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>
                    {expense.price} RON
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Item>
                    <Item.Content>{expense.amount}</Item.Content>
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
                        to={`/editExpense/${expense.id}`}
                        className={classes.edit}
                      >
                        <Icon name='edit' />
                        Edit Expense
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={classes.delete}
                        onClick={() => setConfirmOpen(true)}
                      >
                        <Icon name='delete' />
                        Delete Expense
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>
            </Item.Group>
            <Modal show={confirmOpen}>
              <Modal.Body>
                Do you really want to delete this expense?
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
                  onClick={() => handleCancelToggle(expense.id)}
                >
                  Delete expense
                </Button>
              </Modal.Footer>
            </Modal>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
