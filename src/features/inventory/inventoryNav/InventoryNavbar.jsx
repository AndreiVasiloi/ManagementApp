import React, { useState } from "react";
import { Modal, Navbar } from "react-bootstrap";
import classes from "../../../css/TopNavbar.module.css";
import { Button, FormField, Icon, Input } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToCategoriesFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToCategories } from "../inventoryCategoriesActions";

export default function InventoryNavbar({ setText }) {
  const { responsiveClass } = useSelector((state) => state.addClass);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.category.categories);
  const currentUserCategories = categories.filter(
    (category) => category?.userUid === currentUser?.uid
  );
  const ENTER = 13;

  function handleSearch(event) {
    if (event.which === ENTER) {
      const { value } = event.target;
      setText(value);
    }
  }

  useFirestoreCollection({
    query: () => listenToCategoriesFromFirestore(),
    data: (categories) => dispatch(listenToCategories(categories)),
    deps: [dispatch],
  });

  return (
    <Navbar
      fixed="top"
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarInventoryContainer}>
        <div className={classes.topNavbarInventoryLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand} href="#home">
            Inventory
          </Navbar.Brand>
          <FormField
            className={`ui icon input ${classes.topNavbarInventoryForm}`}
          >
            <Input
              className={classes.topNavbarSearch}
              icon={
                <Icon name="search" color="teal" style={{ marginRight: 5 }} />
              }
              size="small"
              placeholder="Search"
              onKeyPress={handleSearch}
            ></Input>
          </FormField>
        </div>
        <div className={classes.topNavbarInventoryRightCol}>
          <Button
            color="teal"
            icon
            size="small"
            className={classes.topNavbarReasonsButton}
            as={NavLink}
            to="/inventoryCategories"
          >
            <Icon name="archive" /> Categories
          </Button>
          {currentUserCategories.length > 0 ? (
            <Button
              icon
              size="small"
              className={classes.topNavbarAddButton}
              as={NavLink}
              to="/createItem"
            >
              <Icon name="add" className={classes.topNavbarAddButtonIcon} />
            </Button>
          ) : (
            <Button
              icon
              size="small"
              className={classes.topNavbarAddButton}
              onClick={() => setConfirmOpen(true)}
            >
              <Icon name="add" className={classes.topNavbarAddButtonIcon} />
            </Button>
          )}
        </div>
      </div>
      <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
        <Modal.Body>
          Please add some categories for your items first.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Close
          </Button>
          <Button color='teal' as={NavLink} to="/inventoryCategories">
            go to categories
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
