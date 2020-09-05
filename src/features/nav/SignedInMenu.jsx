import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import classes from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../auth/authActions";
import { useHistory } from "react-router-dom";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth);
  const history = useHistory();
  return (
    <Nav>
      <Dropdown>
        <Dropdown.Toggle id='dropdown-basic' className={classes.DropdownMenu}>
          {currentUser.email}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item
            href='#/action-3'
            onClick={() => {
              dispatch(signOutUser());
              history.push('/');
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
