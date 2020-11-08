import React from "react";
import { Navbar } from "react-bootstrap";
import classes from "../../../css/TopNavbar.module.css";
import { Button, FormField, Icon, Input } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InventoryNavbar({ setText }) {
  const { responsiveClass } = useSelector((state) => state.addClass);
  const ENTER = 13;

  function handleSearch(event) {
    if (event.which === ENTER) {
      const { value } = event.target;
      setText(value);
    }
  }

  return (
    <Navbar
      fixed="top"
      className={
        responsiveClass
          ? `${classes.topNavbar}`
          : `${classes.topNavbar} ${classes.responsive}`
      }
    >
      <div className={classes.topNavbarInventoryContainer}>
        <div className={classes.topNavbarInventoryLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand} href="#home">
            Inventory
          </Navbar.Brand>
          <FormField className={`ui icon input ${classes.topNavbarInventoryForm}`}>
            <Input
              className={classes.topNavbarSearch}
              icon={
                <Icon name="search" color="teal" style={{ marginRight: 5 }} />
              }
              size="small"
              placeholder="Search"
              onKeyPress={handleSearch}
            ></Input>
          </FormField>
        </div>
        <div className={classes.topNavbarInventoryRightCol}>
          <Button
            color="teal"
            icon
            size="small"
            className={classes.topNavbarReasonsButton}
            as={NavLink}
            to="/inventoryCategories"
          >
            <Icon name="archive" /> Categories
          </Button>
          <Button
            icon
            size="small"
            className={classes.topNavbarAddButton}
            as={NavLink}
            to="/createItem"
          >
            <Icon name="add" className={classes.topNavbarAddButtonIcon} />
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
