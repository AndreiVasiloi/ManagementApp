import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Icon, List, Segment } from "semantic-ui-react";
import {
  getAppointmentsNumberInMonth,
  getItemsNumberInMonth,
  listenToReasonsFromFirestore,
} from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import classes from "../../css/Dashboard.module.css";
import { getAppointmentsMonth } from "../appointments/appointmentsActions";
import { listenToReasons } from "../appointments/reasonsActions";
import Chart from "./chart/Chart";
import { MONTH_NAMES } from "../appointments/appointmentsConstants";
import { getItemsMonth } from "../inventory/inventoryItemsActions";
import { addActiveClass } from "../inventory/inventoryNavActions";
import { Button } from "react-bootstrap";

export default function ProfitDashboard({ match }) {
  const { reasons } = useSelector((state) => state.reason);
  const { activeClass } = useSelector((state) => state.addClass);
  const { itemsMonth } = useSelector((state) => state.item);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const firstDayInMonth = days[0];
  const lastDayInMonth = days[days.length - 1];
  const monthName = MONTH_NAMES[month];
  const fullDateFirstDay = new Date(year, month, firstDayInMonth);
  const fullDateLastDay = new Date(year, month, lastDayInMonth);
  const dispatch = useDispatch();
  const { appointmentsMonth } = useSelector((state) => state.appointment);
  const [predicate, setPredicate] = useState(
    new Map([
      ["firstDay", fullDateFirstDay],
      ["lastDay", fullDateLastDay],
      ["sort", "expirationDate"],
    ])
  );

  const addAppointmentPrice = appointmentsMonth.map((appointment) => ({
    ...appointment,
    price: getPrice(appointment.reason),
  }));
  const getAllPrices = addAppointmentPrice.map((app) => app.price);
  const getItemsCosts = itemsMonth.map((item) => item.price * item.amount);
  const totalPrices = getTotalPrices();
  const totalCosts = getTotalCosts();
  const profit = totalPrices - totalCosts;

  function getPrice(reasontype) {
    const reason = reasons.find((reason) => reason.text === reasontype);
    if (reason !== undefined) {
      return reason.price;
    }
  }

  function addNumbers(total, num) {
    return total + num;
  }

  function getTotalPrices() {
    if (getAllPrices.length > 0) {
      return getAllPrices.reduce(addNumbers);
    }
  }

  function getTotalCosts() {
    if (getItemsCosts.length > 0) {
      return getItemsCosts.reduce(addNumbers);
    }
  }

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getDaysAsArray(lastDay) {
    let days = [];

    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    return days;
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => getAppointmentsNumberInMonth(predicate),
    data: (appointmentsMonth) =>
      dispatch(getAppointmentsMonth(appointmentsMonth)),
    deps: [dispatch, predicate],
  });

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getItemsNumberInMonth(predicate),
    data: (itemsMonth) => dispatch(getItemsMonth(itemsMonth)),
    deps: [dispatch, predicate],
  });

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <List className={classes.profitMonthsList}>
                {MONTH_NAMES.map((month) => (
                  <List.Item
                    key={month}
                    onClick={() => {
                      setMonth(MONTH_NAMES.indexOf(month));
                      dispatch(addActiveClass(month));
                    }}
                    className={
                      activeClass === month
                        ? `${classes.monthProfit} ${classes.activeMonth}`
                        : `${classes.monthProfit} `
                    }
                  >
                    {month}
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <div className={classes.yearContainer}>
                <div className={classes.changeDateContainer}>
                  <div className={classes.prevYear}>
                    <Icon
                      name="angle double left"
                      onClick={() => setYear(year - 1)}
                    />
                  </div>
                  <div className={classes.yearText}>
                    <p>{year}</p>
                  </div>
                  <div className={classes.nextYear}>
                    <Icon
                      name="angle double right"
                      onClick={() => setYear(year + 1)}
                    />
                  </div>
                </div>
                <div className={classes.changeDateBtnContainer}>
                  <Button
                  className={classes.changeDateBtn}
                    onClick={() => {
                      handleSetPredicate("firstDay", fullDateFirstDay);
                      handleSetPredicate("lastDay", fullDateLastDay);
                    }}
                  >
                    Change date
                  </Button>
                </div>
              </div>
              <div className={classes.profitText}>
                Your profit on {monthName} is {profit}
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <div className={classes.chartContainer}>
                <Chart month={appointmentsMonth} days={days} />
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
}
