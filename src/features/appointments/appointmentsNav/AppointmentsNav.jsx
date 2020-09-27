import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FormField, Icon } from 'semantic-ui-react';
import classes from './AppointmentsNav.module.css';

export default function AppointmentsNav() {
    return (
         <div>
      <Navbar
        fixed="top"
        // className={
        //   responsiveClass
        //     ? `${classes.inventoryNav}`
        //     : `${classes.inventoryNav} ${classes.responsive}`
        // }
      >
        <div className={classes.inventoryNavLeftCol}>
          <Navbar.Brand className={classes.inventoryNavBrand} href="#home">
            Inventory
          </Navbar.Brand>
        </div>
        <div className={classes.inventoryNavRightCol}>
        <FormField className={`ui icon input ${classes.inventoryNavSearch}`}>
            <input
              type="text"
              placeholder="Search..."
            //   onKeyPress={handleSearch}
            />
            <Icon name="search" className={classes.inventoryNavSearchIcon} />
          </FormField>
          <Button
            className={classes.inventoryNavButton}
            as={NavLink}
            to="/createAppointment"
          >
            Add Appointment
          </Button>
          <Button
            className={classes.inventoryNavButton}
            as={NavLink}
            to="/inventoryCategories"
          >
            Manage Reasons
          </Button>
        </div>
      </Navbar>
    </div>
    )
}
