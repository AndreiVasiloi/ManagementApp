import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./NavBar.module.css";
import { Icon } from "semantic-ui-react";

export default function NavBar() {
  return (
    <>
      <Navbar bg='light' expand='lg' className={classes.NavBar}>
        <Navbar.Brand className={classes.NavBarBrand}>
            <Icon name='calendar check outline'/>User name
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto '>
            <Nav.Link
              href='#home'
              className={classes.NavLink}
            >
              Appointments
            </Nav.Link>
            <Nav.Link
              href='#link'
              className={classes.NavLink}
            >
              Inventory
            </Nav.Link>
            <Nav.Link
              href='#link'
              className={classes.NavLink}
            >
              Profit calculator
            </Nav.Link>
            <Nav.Link
              href='#link'
              className={classes.NavLink}
            >
              Sandbox
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
