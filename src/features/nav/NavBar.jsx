import React from "react";
import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import { useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";

export default function NavBar() {
  const {authenticated} = useSelector(state => state.auth);

  return (
    <>
     <div className={classes.sidebar}>
        <Link to='/'>
          <Icon name='user' />
          User name
        </Link>
        <Link to="/appointments">
          <Icon name='book' /> Appointments
        </Link>
        <Link  to="/inventory">
          <Icon name='archive' /> Inventory
        </Link>
        <Link to="/profit">
          <Icon name='percent' /> Profit
        </Link>
        <Link to="/sandbox">Sandbox</Link>
     
          <Icon name='log out' /> Sign out

        {authenticated ? (
            <SignedInMenu />
          ) : (
            <SignedOutMenu />
          )}
      </div>
    </>
  );
}
