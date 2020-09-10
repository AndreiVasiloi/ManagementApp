import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import classes from "./InventoryNavbar.module.css";
import { FormField, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function InventoryNavbar() {
  return (
    <Navbar fixed='top' className={classes.inventoryNav}>
      <Navbar.Brand className={classes.inventoryNavBrand} href='#home'>
        Inventory
      </Navbar.Brand>
      <FormField className={`ui icon input ${classes.inventoryNavSearch}`}>
        <input type='text' placeholder='Search...' />
        <Icon name='search' className={classes.inventoryNavSearchIcon} />
      </FormField>
      <Nav className={classes.inventoryNavDropdown}>
        <NavDropdown
          title='Add'
          id='basic-nav-dropdown'
          className={classes.inventoryNavDropdownTitle}
        >
          <NavDropdown.Item
            className={classes.inventoryNavDropdownLink}
            as={NavLink}
            to='/createItem'
          >
            Add Item
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className={classes.inventoryNavDropdownLink}
            as={NavLink}
            to='/inventoryCategories'
          >
            Manage Categories
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}
