import React from "react";
import classes from "../../css/NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Nav } from "react-bootstrap";
import {
  addActiveClass,
  addResponsiveClass,
} from "../inventory/inventoryNavActions";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { responsiveClass } = useSelector((state) => state.addClass);
  const { activeClass } = useSelector((state) => state.addClass);
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push('/')
    } catch (error) {
      
    }
  }

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
        {currentUserProfile.displayName}
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
      onClick={() => dispatch(addActiveClass("account"))}
        as={Link}
        className={
          activeClass === "account"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/account"
      >
        <Icon name="settings" />
        My Account
      </Nav.Item>
      <Nav.Item
      onClick={() => dispatch(addActiveClass("profile"))}
        as={Link}
        className={
          activeClass === "profile"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to={`/profile/${currentUserProfile.id}`}
      >
        <Icon name="user" />
        My Profile
      </Nav.Item>
      <Nav.Item
        as={Link}
        className={classes.navLink}
        to="/"
        onClick={handleSignOut}
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
