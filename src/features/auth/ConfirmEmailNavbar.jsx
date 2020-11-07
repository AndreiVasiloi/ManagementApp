import React from "react";
import { Navbar } from "react-bootstrap";
import classes from "../../css/TopNavbar.module.css";
import { useSelector } from "react-redux";

export default function ConfirmEmailNavbar() {
    const { responsiveClass } = useSelector((state) => state.addClass);
    return (
        <Navbar
      fixed="top"
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarLeftCol}>
        <Navbar.Brand className={classes.topNavbarBrand} href="#home">
          Confirm Email
        </Navbar.Brand>
      </div>
      <div className={classes.topNavbarRightCol}>
      </div>
    </Navbar>
    )
}
