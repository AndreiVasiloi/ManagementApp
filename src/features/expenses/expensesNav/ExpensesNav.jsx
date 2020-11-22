import React from "react";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, FormField, Icon, Input } from "semantic-ui-react";
import classes from "../../../css/TopNavbar.module.css";

export default function ExpensesNav({ setText }) {
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
        <div className={classes.topNavbarExpensesContainer}>
          <div className={classes.topNavbarExpensesLeftCol}>
            <Navbar.Brand className={`${classes.topNavbarBrand} ${classes.expensesBrand}`}>
              Expenses
            </Navbar.Brand>
          </div>
          <div className={classes.topNavbarExpensesRightCol}>
            <FormField className={`ui icon input ${classes.expensesForm}`}>
              <Input
                className={classes.topNavbarExpensesSearch}
                icon={
                  <Icon name="search" color="teal" style={{ marginRight: 5 }} />
                }
                size="small"
                placeholder="Search"
                onKeyPress={handleSearch}
              ></Input>
            </FormField>
            <Button
              icon
              size="small"
              className={classes.topNavbarAddButton}
              as={NavLink}
              to="/createExpense"
            >
              <Icon name="add" className={classes.topNavbarAddButtonIcon} />
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
