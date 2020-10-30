import React from "react";
import { Navbar } from "react-bootstrap";
import classes from "../../../css/TopNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

export default function InventoryCategoriesNavbar() {
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
          Manage categories
        </Navbar.Brand>
      </div>
      <div className={classes.topNavbarRightCol}>
        <Button
          icon
          size="small"
          className={classes.topNavbarAddButton}
          as={NavLink}
          to="/inventory"
        >
          <Icon name="undo" className={classes.topNavbarAddButtonIcon} />
        </Button>
        <Button
          icon
          size="small"
          className={classes.topNavbarAddButton}
          as={NavLink}
          to="/createCategory"
        >
          <Icon name="add" className={classes.topNavbarAddButtonIcon} />
        </Button>
      </div>
    </Navbar>
  );
}
