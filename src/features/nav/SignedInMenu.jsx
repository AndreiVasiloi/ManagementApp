import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import classes from "./NavBar.module.css";

export default function SignedInMenu({signOut}) {
  return (
    <Nav>
      <Dropdown>
        <Dropdown.Toggle id='dropdown-basic' className={classes.DropdownMenu}>
          Andrew
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item
            href='#/action-3'
            onClick={signOut}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
