import React from "react";
import classes from "../../css/NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
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
      history.push("/");
    } catch (error) {}
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
        to={`/profile/${currentUserProfile?.id}`}
      >
        <Image
          avatar
          spaced="right"
          src={currentUserProfile?.photoURL || "/assets/user.png"}
        />
        {currentUserProfile?.displayName}
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          dispatch(addActiveClass("appointments"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
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
        onClick={() => {
          dispatch(addActiveClass("inventory"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
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
        onClick={() => {
          dispatch(addActiveClass("clients"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
        as={Link}
        className={
          activeClass === "clients"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/clients"
      >
        <Icon name="users" /> Clients
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          dispatch(addActiveClass("expenses"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
        as={Link}
        className={
          activeClass === "expenses"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to="/expenses"
      >
        <Icon name="money bill alternate outline" /> Expenses
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          dispatch(addActiveClass("profit"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
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
      {/* <Nav.Item
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
      </Nav.Item> */}
      <Nav.Item
        onClick={() => {
          dispatch(addActiveClass("profile"));
          dispatch(addResponsiveClass(!responsiveClass));
        }}
        as={Link}
        className={
          activeClass === "profile"
            ? `${classes.navLink} ${classes.active}`
            : `${classes.navLink} `
        }
        to={`/profile/${currentUserProfile?.id}`}
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
