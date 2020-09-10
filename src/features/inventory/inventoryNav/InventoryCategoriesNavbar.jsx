import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import classes from "./InventoryNavbar.module.css";
import { NavLink } from "react-router-dom";

export default function InventoryCategoriesNavbar() {
  return (
    <Navbar fixed='top' className={classes.inventoryNav}>
      <Navbar.Brand className={classes.inventoryNavBrand} href='#home'>
        Edit categories
      </Navbar.Brand>
      <Nav className={classes.addCatBtnContainer}>
        <Button variant="primary" as={NavLink} to='/createCategory' className={classes.addCatBtn}>Add</Button>
      </Nav>
    </Navbar>
  );
}
