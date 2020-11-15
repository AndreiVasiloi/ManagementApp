import React, { useState } from "react";
import {
  Button,
  Header,
  Icon,
  Popup,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { MONTH_NAMES } from "../appointments/appointmentsConstants";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import {
  getAppointmentsByMonth,
  getExpensesByMonth,
} from "../../app/firestore/firestoreService";
import { getAppointmentsMonth } from "../appointments/appointmentsActions";
import { getExpensesMonth } from "../expenses/expensesActions";
import MonthlyChart from "./chart/MonthlyChart";
import classes from "../../css/Dashboard.module.css";

export default function MonthlyProfit({
  setMonth,
  month,
  year,
  fullDateLastDay,
  fullDateFirstDay,
  days,
  profit,
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const firstDate = new Date(fullDateFirstDay); // 1 oct
  const secondDate = new Date(fullDateLastDay); // 31 oct
  const { appointmentsMonth } = useSelector((state) => state.appointment);
  const { expensesMonth } = useSelector((state) => state.expense);
  const predicate = new Map([
    ["firstDate", firstDate],
    ["secondDate", secondDate],
  ]);

  const currentUserAppointments = appointmentsMonth.filter(
    (appointment) => appointment?.userUid === currentUser?.uid
  );

  const currentUserExpenses = expensesMonth.filter(
    (expense) => expense?.userUid === currentUser?.uid
  );

  const appointmentsDates = currentUserAppointments.map(
    (appointment) => new Date(appointment.date)
  );
  const expensesDates = currentUserExpenses.map(
    (expense) => new Date(expense.purchaseDate)
  );

  const monthName = MONTH_NAMES[month];

  function handleSetPredicate(key, value) {
    // setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => getAppointmentsByMonth(predicate),
    data: (appointmentsMonth) =>
      dispatch(getAppointmentsMonth(appointmentsMonth)),
    deps: [dispatch, month],
  });

  useFirestoreCollection({
    query: () => getExpensesByMonth(predicate),
    data: (expensesMonth) => dispatch(getExpensesMonth(expensesMonth)),
    deps: [dispatch, month],
  });

  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <Header textAlign="center">
          {monthName}
          <Header.Subheader>{year}</Header.Subheader>
          <Header.Subheader>
            <Popup
              trigger={
                <Icon
                  className={classes.changeProfitDateIcon}
                  name="angle left"
                  onClick={() => {
                    setMonth(month - 1);
                  }}
                  disabled={month === 0}
                />
              }
              content="previous month"
              position="top center"
            />
            <Button
              size="mini"
              color="teal"
              content="update month"
              onClick={() => {
                handleSetPredicate("firstDate", firstDate);
                handleSetPredicate("secondDate", secondDate);
              }}
            />
            <Popup
              trigger={
                <Icon
                  className={classes.changeProfitDateIcon}
                  name="angle right"
                  onClick={() => {
                    setMonth(month + 1);
                  }}
                  disabled={month === 11}
                />
              }
              content="next month"
              position="top center"
            />
          </Header.Subheader>
        </Header>
        <Statistic>
          <Statistic.Label>Profit</Statistic.Label>
          <Statistic.Value>
            {profit(currentUserAppointments, currentUserExpenses)}
          </Statistic.Value>
        </Statistic>
        <MonthlyChart
          appointmentsDates={appointmentsDates}
          expensesDates={expensesDates}
          days={days}
        />
      </Segment>
    </Segment.Group>
  );
}
