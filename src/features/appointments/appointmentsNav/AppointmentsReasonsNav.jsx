import React from "react";
import { Navbar } from "react-bootstrap";
import classes from "../../../css/TopNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

export default function AppointmentsReasonsNav() {
  const { responsiveClass } = useSelector((state) => state.addClass);
  return (
    <Navbar
      fixed="top"
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarReasonsContainer}>
        <div className={classes.topNavbarReasonsLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand} href="#home">
            Manage reasons
          </Navbar.Brand>
        </div>
        <div className={classes.topNavbarReasonsRightCol}>
          <Button
            icon
            size="small"
            className={classes.topNavbarAddButton}
            as={NavLink}
            to="/appointments"
          >
            <Icon name="undo" className={classes.topNavbarAddButtonIcon} />
          </Button>
          <Button
            icon
            size="small"
            className={classes.topNavbarAddButton}
            as={NavLink}
            to="/createReason"
          >
            <Icon name="add" className={classes.topNavbarAddButtonIcon} />
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
