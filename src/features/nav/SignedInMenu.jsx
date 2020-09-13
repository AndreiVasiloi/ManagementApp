import React, { useState, useEffect } from "react";
import classes from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../auth/authActions";
import { useHistory, Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  const [selectClass, setSelectClass] = useState();

  function handleChangeClass() {
    debugger
    setSelectClass(false);
  }
  // const selectNav = useRef(null);
  
  // function handleNavIcon() {
  //   selectNav.current.focus();
  // }

  
  // function handleResponsiveNav() {
    
  //   console.log(selectNav.current.toString() === 'div.NavBar_sidebar__3OH7H');
  //   if (selectNav.className === "sidebar") {
  //     selectNav.className += " responsive";
  //   } else {
  //     selectNav.className = "sidebar";
  //   }
  // }
  return (
    <div className={selectClass ?  `${classes.sidebar}` : `responsive ${classes.sidebar}`}>
      <Link className={classes.navLink} to="/">
        <Icon name="user" />
        {currentUser.email}
      </Link>
      <Link className={classes.navLink} to="/appointments">
        <Icon name="book" /> Appointments
      </Link>
      <Link className={classes.navLink} to="/inventory">
        <Icon name="archive" /> Inventory
      </Link>
      <Link className={classes.navLink} to="/profit">
        <Icon name="percent" /> Profit
      </Link>
      <Link className={classes.navLink} to="/sandbox">Sandbox</Link>
      <Link
      className={classes.navLink}
        to="/"
        onClick={() => {
          dispatch(signOutUser());
          history.push("/");
        }}
      >
        <Icon name="log out" /> Sign out
      </Link >
      <a href="a" className={classes.iconLink} onClick={handleChangeClass}>
        <Icon className={classes.icon} name="bars" />
      </a>
    </div>
  );
}
