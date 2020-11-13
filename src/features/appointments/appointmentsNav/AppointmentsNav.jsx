import React, { useState } from "react";
import { Modal, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, FormField, Icon, Input, Popup } from "semantic-ui-react";
import { listenToReasonsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "../../../css/TopNavbar.module.css";
import { listenToReasons } from "../reasonsActions";

export default function AppointmentsNav({ setText, setShowAllAppointments }) {
  const dispatch = useDispatch();
  const { responsiveClass } = useSelector((state) => state.addClass);
  const { reasons } = useSelector((state) => state.reason);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const ENTER = 13;
  const currentUserReasons = reasons.filter(
    (reason) => reason?.userUid === currentUser?.uid
  );

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });

  function handleSearch(event) {
    if (event.which === ENTER) {
      const { value } = event.target;
      setText(value);
    }
  }

  return (
    <Navbar
      fixed="top"
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarAppointmentsContainer}>
        <div className={classes.topNavbarAppointmentsLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand}>
            Appointments
          </Navbar.Brand>
          <FormField
            className={`ui icon input ${classes.topNavbarAppointmentsForm}`}
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
        <div className={classes.topNavbarAppointmentsRightCol}>
          <Button.Group
            size="small"
            className={classes.topNavbarChangeAppNumberIconsGroup}
          >
            <Popup
              trigger={
                <Button
                  size="small"
                  icon
                  color="teal"
                  onClick={() => setShowAllAppointments(false)}
                >
                  <Icon name="content" />
                </Button>
              }
              content="Show only 2 days of appointments"
              position="top center"
            />
            <Popup
              trigger={
                <Button
                  size="small"
                  icon
                  color="teal"
                  onClick={() => setShowAllAppointments(true)}
                >
                  <Icon name="grid layout" />
                </Button>
              }
              content="Show all days of appointments"
              position="top center"
            />
          </Button.Group>
          <Button
            color="teal"
            icon
            size="small"
            className={classes.topNavbarReasonsButton}
            as={NavLink}
            to="/appointmentsReasons"
          >
            <Icon name="pencil" /> Reasons
          </Button>
          {currentUserReasons.length > 0 ? (
            <Button
              icon
              size="small"
              className={classes.topNavbarAddButton}
              as={NavLink}
              to="/createAppointment"
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
          Please add some reasons for your appointments first.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Close
          </Button>
          <Button color='teal' as={NavLink} to="/appointmentsReasons">
            go to reasons
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
