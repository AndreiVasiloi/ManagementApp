import React from "react";
import classes from "../../css/NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../auth/authActions";
import { useHistory, Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Nav } from "react-bootstrap";
import {
  addActiveClass,
  addResponsiveClass,
} from "../inventory/inventoryNavActions";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { responsiveClass } = useSelector((state) => state.addClass);
  const { activeClass } = useSelector((state) => state.addClass);
  const history = useHistory();

  return (
    <div
      className={
        responsiveClass
          ? `${classes.sidebar}`
          : `${classes.sidebar} ${classes.responsive}`
      }
    >
      <Nav.Item
        as={Link}
        className={`${classes.navLink} ${classes.navLinkHeader}`}
        to="/"
      >
        <Icon name="user" />
        {currentUser.email}
      </Nav.Item>
      <Nav.Item
        onClick={() => dispatch(addActiveClass("appointments"))}
        as={Link}
        className={
          activeClass === "appointments"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/appointments"
      >
        <Icon name="book" /> Appointments
      </Nav.Item>
      <Nav.Item
        onClick={() => dispatch(addActiveClass("inventory"))}
        as={Link}
        className={
          activeClass === "inventory"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/inventory"
      >
        <Icon name="archive" /> Inventory
      </Nav.Item>
      <Nav.Item
        onClick={() => dispatch(addActiveClass("profit"))}
        as={Link}
        className={
          activeClass === "profit"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/profit"
      >
        <Icon name="percent" /> Profit
      </Nav.Item>
      <Nav.Item
        onClick={() => dispatch(addActiveClass("sandbox"))}
        as={Link}
        className={
          activeClass === "sandbox"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/sandbox"
      >
        Sandbox
      </Nav.Item>
      <Nav.Item
        as={Link}
        className={classes.navLink}
        to="/"
        onClick={() => {
          dispatch(signOutUser());
          history.push("/");
        }}
      >
        <Icon name="log out" /> Sign out
      </Nav.Item>
      <Nav.Item
        className={classes.navLinkIcon}
        onClick={() => {
          dispatch(addResponsiveClass(!responsiveClass));
        }}
      >
        <Icon className={classes.iconLink} name="bars" />
      </Nav.Item>
    </div>
  );
}
