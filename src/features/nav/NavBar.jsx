import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import { useSelector } from "react-redux";

export default function NavBar() {
  const {authenticated} = useSelector(state => state.auth);

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" className={classes.NavBar}>
        <Navbar.Brand>
          <Nav.Link as={NavLink} to="/" exact className={classes.NavLink}>
            <EventAvailableIcon style={{ marginRight: "10px" }} />
            User name
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
            <Nav.Link
              href="#home"
              className={classes.NavLink}
              as={NavLink}
              to="/appointments"
            >
              Appointments
            </Nav.Link>
            <Nav.Link
              href="#link"
              className={classes.NavLink}
              as={NavLink}
              to="/inventory"
            >
              Inventory
            </Nav.Link>
            <Nav.Link
              href="#link"
              className={classes.NavLink}
              as={NavLink}
              to="/profit"
            >
              Profit calculator
            </Nav.Link>
            <Nav.Link
              href="#link"
              className={classes.NavLink}
              as={NavLink}
              to="/sandbox"
            >
              Sandbox
            </Nav.Link>
          </Nav>
          {authenticated ? (
            <SignedInMenu />
          ) : (
            <SignedOutMenu />
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
