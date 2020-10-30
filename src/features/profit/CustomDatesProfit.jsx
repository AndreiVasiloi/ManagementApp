import React, { useState } from "react";
import { Button, Grid, Header, Segment, Statistic } from "semantic-ui-react";
import classes from "../../css/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-calendar";
import { differenceInDays, format } from "date-fns";
import CustomDatesChart from "./chart/CustomDatesChart";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import {
  getAppointmentsByCustomDates,
  getExpensesByCustomDates,
} from "../../app/firestore/firestoreService";
import { getAppointmentsCustomDate } from "../appointments/appointmentsActions";
import { getExpensesCustomDates } from "../expenses/expensesActions";

export default function CustomDatesProfit({
  daysInMonth,
  daysAsArray,
  profit,
}) {
  const dispatch = useDispatch();
  const [showCalendar, setShowCalendar] = useState(true);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const numberOfDays = daysInMonth(month + 1, year);
  const days = daysAsArray(numberOfDays);
  const firstDayInMonth = days[0];
  const lastDayInMonth = days[days.length - 1];
  const fullDateFirstDay = new Date(year, month, firstDayInMonth);
  const fullDateLastDay = new Date(year, month, lastDayInMonth);
  const [startDate, setStartDate] = useState(fullDateFirstDay);
  const [endDate, setEndDate] = useState(
    new Date(fullDateLastDay.setDate(fullDateLastDay.getDate() + 1))
  );
  const { appointmentsCustomDate } = useSelector((state) => state.appointment);
  const { expensesCustomDate } = useSelector((state) => state.expense);
  const [predicate, setPredicate] = useState(
    new Map([
      ["firstDate", startDate],
      ["secondDate", endDate],
    ])
  );

  const diffInDays = differenceInDays(new Date(endDate), new Date(startDate));
  const daysLength = Array.from(Array(diffInDays).keys());

  const appointmentsDates = appointmentsCustomDate.map(
    (appointment) => new Date(appointment.date)
  );
  const expensesDates = expensesCustomDate.map(
    (expense) => new Date(expense.purchaseDate)
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => getAppointmentsByCustomDates(predicate),
    data: (appointmentsCustomDate) =>
      dispatch(getAppointmentsCustomDate(appointmentsCustomDate)),
    deps: [dispatch, predicate],
  });

  useFirestoreCollection({
    query: () => getExpensesByCustomDates(predicate),
    data: (expensesCustomDates) =>
      dispatch(getExpensesCustomDates(expensesCustomDates)),
    deps: [dispatch, predicate],
  });

  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <div style={{textAlign: "center"}}>
        <Header>
          <Header.Subheader>
            {format(startDate, "MMMM d, yyyy")} -{" "}
            {format(endDate, "MMMM d, yyyy")}
          </Header.Subheader>
        </Header>
        <Button.Group>
        <Button
            size="mini"
            color="teal"
            content="show calendar"
            onClick={() => setShowCalendar(!showCalendar)}
          />
          <Button
            size="mini"
            color="teal"
            content="update"
            onClick={() => {
              handleSetPredicate("firstDate", startDate);
              handleSetPredicate("secondDate", endDate);
            }}
          />
        </Button.Group>
        </div>
        <div className={classes.chartCalendar}>
          {showCalendar && (
            <Calendar
              onChange={(date) => {
                setStartDate(date[0]);
                setEndDate(new Date(date[1].setDate(date[1].getDate() + 1)));
              }}
              selectRange={true}
            />
          )}
    
        </div>
        <Statistic>
          <Statistic.Label>Profit</Statistic.Label>
          <Statistic.Value>
            {profit(appointmentsCustomDate, expensesCustomDate)}
          </Statistic.Value>
        </Statistic>
        <CustomDatesChart
          firstDate={predicate.get("firstDate")}
          appointmentsDates={appointmentsDates}
          expensesDates={expensesDates}
          days={daysLength}
        />
      </Segment>
    </Segment.Group>
  );
}
