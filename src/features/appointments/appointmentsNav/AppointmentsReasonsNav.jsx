import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import classes from "../../../css/InventoryNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppointmentsReasonsNav() {
  const { responsiveClass } = useSelector((state) => state.addClass);
  return (
    <Navbar
      fixed='top'
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarLeftCol}>
        <Navbar.Brand className={classes.topNavbarBrand} href='#home'>
          Manage reasons
        </Navbar.Brand>
      </div>
      <div className={classes.topNavbarRightCol}>
        <Button
          variant='primary'
          as={NavLink}
          to='/createReason'
          className={classes.topNavbarButton}
        >
          Add
        </Button>
      </div>
    </Navbar>
  );
}
