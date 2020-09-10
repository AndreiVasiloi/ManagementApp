import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./InventoryNavbar.module.css";
import { FormField, Icon, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function InventoryCategoriesNavbar() {
  return (
    <Navbar fixed='top' className={classes.inventoryNav}>
      <Navbar.Brand className={classes.inventoryNavBrand} href='#home'>
        Edit categories
      </Navbar.Brand>
      <FormField className={`ui icon input ${classes.inventoryNavSearch}`}>
        <input type='text' placeholder='Search...' />
        <Icon name='search' className={classes.inventoryNavSearchIcon} />
      </FormField>

      <Nav className={classes.inventoryNavDropdown}>
        <Button content='Add' color='teal' as={NavLink} to='/createCategory' />
      </Nav>
    </Navbar>
  );
}
