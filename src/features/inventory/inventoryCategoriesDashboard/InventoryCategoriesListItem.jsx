import React, { useState } from 'react'
import { Segment, Item, Grid, Icon } from 'semantic-ui-react';
import classes from '../../../css/Dashboard.module.css';
import { Link } from "react-router-dom";
import { deleteCategoryInFirestore } from '../../../app/firestore/firestoreService';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function InventoryCategoriesListItem({category}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleCancelToggle(categoryId) {
    setConfirmOpen(false);
    try {
      await deleteCategoryInFirestore(categoryId);
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
                  <Item.Content>{category.text}</Item.Content>
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
                   as={Link} to={`/editCategory/${category.id}`}
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
          <Modal.Body>Do you really want to delete this category?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setConfirmOpen(false)}>
              Close
            </Button>
            <Button
              variant='danger'
              onClick={() => handleCancelToggle(category.id)}
            >
              Delete item
            </Button>
          </Modal.Footer>
        </Modal>
        </Segment>
      </Segment.Group>
    )
}
