import React from "react";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, FormField, Icon, Input, Popup } from "semantic-ui-react";
import classes from "../../../css/TopNavbar.module.css";

export default function AppointmentsNav({ setText, setShowAllAppointments }) {
  const { responsiveClass } = useSelector((state) => state.addClass);
  const ENTER = 13;

  function handleSearch(event) {
    if (event.which === ENTER) {
      const { value } = event.target;
      setText(value);
    }
  }
  return (
    <div>
      <Navbar
        fixed="top"
        className={
          responsiveClass
            ? `${classes.topNavbar}`
            : `${classes.topNavbar} ${classes.responsive}`
        }
      >
        <div className={classes.topNavbarLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand}>
            Appointments
          </Navbar.Brand>
        </div>
        <div className={classes.topNavbarRightCol}>
          <FormField className={`ui icon input`}>
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
          <Button
            icon
            size="small"
            className={classes.topNavbarAddButton}
            as={NavLink}
            to="/createAppointment"
          >
            <Icon name="add" className={classes.topNavbarAddButtonIcon} />
          </Button>
        </div>
      </Navbar>
    </div>
  );
}
