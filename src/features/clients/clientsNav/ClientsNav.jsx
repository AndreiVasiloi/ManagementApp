import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FormField, Icon } from "semantic-ui-react";
import classes from "../../../css/InventoryNavbar.module.css";

export default function ClientsNav({ setText }) {
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
        fixed='top'
        className={
          responsiveClass
            ? `${classes.topNavbar}`
            : `${classes.topNavbar} ${classes.responsive}`
        }
      >
        <div className={classes.topNavbarLeftCol}>
          <Navbar.Brand className={classes.topNavbarBrand}>
            Clients
          </Navbar.Brand>
        </div>
        <div className={classes.topNavbarRightCol}>
          <FormField className={`ui icon input ${classes.topNavbarSearch}`}>
            <input
              type='text'
              placeholder='Search...'
              onKeyPress={handleSearch}
            />
            <Icon name='search' className={classes.topNavbarSearchIcon} />
          </FormField>
          <Button
            className={classes.topNavbarButton}
            as={NavLink}
            to='/createClient'
          >
            Add Client
          </Button>
        </div>
      </Navbar>
    </div>
  );
}
