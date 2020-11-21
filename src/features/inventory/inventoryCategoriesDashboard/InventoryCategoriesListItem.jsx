import React, { useState } from "react";
import { Segment, Item, Icon } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { Link } from "react-router-dom";
import { deleteCategoryInFirestore } from "../../../app/firestore/firestoreService";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function InventoryCategoriesListItem({ category }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUserCategories = category?.userUid === currentUser?.uid;

  async function handleCancelToggle(categoryId) {
    setConfirmOpen(false);
    try {
      await deleteCategoryInFirestore(categoryId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isCurrentUserCategories && (
        <Segment.Group className={classes.dashboardListElement}>
          <Segment
            textAlign="center"
            className={classes.inventoryItemContainer}
          >
            <Item.Group>
              <Container fluid>
                <Row>
                  <Col lg={11} xs={10}>
                    <Item>
                      <Item.Content>{category.text}</Item.Content>
                    </Item>
                  </Col>
                  <Col lg={1} xs={2}>
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
                          to={`/editCategory/${category.id}`}
                          className={classes.edit}
                        >
                          <Icon name="edit" />
                          Edit Category
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setConfirmOpen(true)}
                          className={classes.delete}
                        >
                          <Icon name="delete" />
                          Delete Category
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Container>
            </Item.Group>
            <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
              <Modal.Body>
                Do you really want to delete this category?
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
                  onClick={() => handleCancelToggle(category.id)}
                >
                  Delete category
                </Button>
              </Modal.Footer>
            </Modal>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
