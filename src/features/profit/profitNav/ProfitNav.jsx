import React from "react";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import classes from "../../../css/TopNavbar.module.css";

export default function ProfitNav({setShowChart}) {
  const { responsiveClass } = useSelector((state) => state.addClass);
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
            Profit
          </Navbar.Brand>
        </div>
        <div className={classes.topNavbarRightCol}>
          <Button.Group
            size="small"
            className={classes.topNavbarChangeAppNumberIconsGroup}
          >
            <Button size="small" icon color="teal">
              <Icon name="chart line" />
            </Button>
            <Button size="small" icon color="teal" content="monthly" onClick={() => setShowChart('monthly')} />
            <Button size="small" icon color="teal" content="annual" onClick={() => setShowChart('annual')} />
            <Button size="small" icon color="teal" content="custom" onClick={() => setShowChart('custom')} />
          </Button.Group>
        </div>
      </Navbar>
    </div>
  );
}
