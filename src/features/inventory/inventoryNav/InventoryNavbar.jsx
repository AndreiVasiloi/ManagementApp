import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import classes from "../../../css/InventoryNavbar.module.css";
import { FormField, Icon } from "semantic-ui-react";
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
    <div>
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
            Inventory
          </Navbar.Brand>
        </div>
        <div className={classes.topNavbarRightCol}>
        <FormField className={`ui icon input ${classes.topNavbarSearch}`}>
            <input
              type="text"
              placeholder="Search..."
              onKeyPress={handleSearch}
            />
            <Icon name="search" className={classes.topNavbarSearchIcon} />
          </FormField>
          <Button
            className={classes.topNavbarButton}
            as={NavLink}
            to="/createItem"
          >
            Add Item
          </Button>
          <Button
            className={classes.topNavbarButton}
            as={NavLink}
            to="/inventoryCategories"
          >
            Manage Categories
          </Button>
          {/* <Nav className={classes.inventoryNavDropdown}>
            <NavDropdown
              title="Manage"
              id="basic-nav-dropdown"
              className={classes.inventoryNavDropdownTitle}
            >
              <NavDropdown.Item
                className={classes.inventoryNavDropdownLink}
                as={NavLink}
                to="/createItem"
              >
                Add Item
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className={classes.inventoryNavDropdownLink}
                as={NavLink}
                to="/inventoryCategories"
              >
                Manage Categories
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
        </div>
      </Navbar>
    </div>
  );
}
