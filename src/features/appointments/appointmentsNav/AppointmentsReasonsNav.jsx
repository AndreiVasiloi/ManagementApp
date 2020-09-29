import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import classes from '../../../css/AppointmentsNav.module.css';
import { NavLink } from "react-router-dom";

export default function AppointmentsReasonsNav() {
  return (
    <Navbar fixed='top' className={classes.inventoryNav}>
      <Navbar.Brand className={classes.inventoryNavBrand} href='#home'>
        Edit reasons
      </Navbar.Brand>
      <Nav className={classes.addCatBtnContainer}>
        <Button variant="primary" as={NavLink} to='/createReason' className={classes.addCatBtn}>Add</Button>
      </Nav>
    </Navbar>
  );
}
