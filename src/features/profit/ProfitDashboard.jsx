import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import {
  getExpensesByMonth,
  listenToReasonsFromFirestore,
} from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import classes from "../../css/Dashboard.module.css";
import { listenToReasons } from "../appointments/reasonsActions";
import { getExpensesMonth } from "../expenses/expensesActions";
import MonthlyProfit from "./MonthlyProfit";
import CustomDatesProfit from "./CustomDatesProfit";
import AnnualProfit from "./AnnualProfit";
import ProfitNav from "./profitNav/ProfitNav";

export default function ProfitDashboard({ match }) {
  const { reasons } = useSelector((state) => state.reason);
  const [showChart, setShowChart] = useState("monthly");
  const date = new Date();
  const [year] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const firstDayInMonth = days[0];
  const lastDayInMonth = days[days.length - 1];
  const fullDateFirstDay = new Date(year, month, firstDayInMonth);
  const fullDateLastDay = new Date(year, month, lastDayInMonth);
  const dispatch = useDispatch();
  const [predicate] = useState(
    new Map([
      ["firstDate", fullDateFirstDay],
      ["secondDate", fullDateLastDay],
      ["sort", "expirationDate"],
    ])
  );

  function getPrice(reasonType) {
    const reason = reasons.find((reason) => reason.text === reasonType);
    if (reason !== undefined) {
      return reason.price;
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

  function calculateProfit(appointments, expenses) {
    const addAppointmentPrice = appointments.map((appointment) => ({
      ...appointment,
      price: getPrice(appointment.reason),
    }));
    const getAllPrices = addAppointmentPrice.map((app) => app.price);
    const getExpensesCosts = expenses.map(
      (expense) => expense.price * expense.amount
    );
    const totalAppointmentsPrices =
      getAllPrices.length > 0 &&
      getAllPrices.reduce((total, num) => total + num);
    const totalCosts =
      getExpensesCosts.length > 0 &&
      getExpensesCosts.reduce((total, num) => total - num);
    if (!isNaN(totalAppointmentsPrices) && !isNaN(totalCosts)) {
      return totalAppointmentsPrices - totalCosts;
    }
  }


  function displayChart(chart) {
    if (chart === "monthly") {
      return (
        <MonthlyProfit
          setMonth={setMonth}
          month={month}
          year={year}
          fullDateFirstDay={fullDateFirstDay}
          fullDateLastDay={fullDateLastDay}
          days={days}
          profit={calculateProfit}
        />
      );
    } else if (chart === "annual") {
      return (
        <AnnualProfit
          profit={calculateProfit}
        />
      );
    } else {
      return (
        <CustomDatesProfit
          daysInMonth={getDaysInMonth}
          daysAsArray={getDaysAsArray}
          profit={calculateProfit}
        />
      );
    }
  }

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getExpensesByMonth(predicate),
    data: (expensesMonth) => dispatch(getExpensesMonth(expensesMonth)),
    deps: [dispatch, predicate],
  });

  return (
    <div className={classes.dashboardContainer}>
      <Grid>
        <Grid.Column width={16}>
          <ProfitNav setShowChart={setShowChart} />
          {displayChart(showChart)}
        </Grid.Column>
      </Grid>
    </div>
  );
}
