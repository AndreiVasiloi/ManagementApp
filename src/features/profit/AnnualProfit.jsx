import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Icon, Segment, Statistic } from "semantic-ui-react";
import {
  getAppointmentsByYear,
  getExpensesByYear,
} from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { getAppointmentsYear } from "../appointments/appointmentsActions";
import { getExpensesYear } from "../expenses/expensesActions";
import AnnualChart from "./chart/AnnualChart";
import classes from "../../css/Dashboard.module.css";

export default function AnnualProfit({ profit }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const firstDate = new Date(year, 0, 1);
  const secondDate = new Date(year, 11, 31);
  const { appointmentsYear } = useSelector((state) => state.appointment);
  const { expensesYear } = useSelector((state) => state.expense);
  const [predicate, setPredicate] = useState(
    new Map([
      ["firstDate", firstDate],
      ["secondDate", secondDate],
      ["sort", "expirationDate"],
    ])
  );

  const currentUserAppointments = appointmentsYear.filter(
    (appointment) => appointment?.userUid === currentUser?.uid
  );

  const currentUserExpenses = expensesYear.filter(
    (expense) => expense?.userUid === currentUser?.uid
  );

  const appointmentsDates = currentUserAppointments.map(
    (appointment) => new Date(appointment.date)
  );
  const expensesDates = currentUserExpenses.map(
    (expense) => new Date(expense.purchaseDate)
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => getAppointmentsByYear(predicate),
    data: (appointmentsYear) => dispatch(getAppointmentsYear(appointmentsYear)),
    deps: [dispatch, predicate],
  });

  useFirestoreCollection({
    query: () => getExpensesByYear(predicate),
    data: (expensesYear) => dispatch(getExpensesYear(expensesYear)),
    deps: [dispatch, predicate],
  });

  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <Header textAlign="center">
          {year}
          <Header.Subheader>
            <Icon name="angle double left" onClick={() => setYear(year - 1)} />
            <Button
              size="mini"
              color="teal"
              content="update year"
              onClick={() => {
                handleSetPredicate("firstDate", firstDate);
                handleSetPredicate("secondDate", secondDate);
              }}
            />
            <Icon name="angle double right" onClick={() => setYear(year + 1)} />
          </Header.Subheader>
        </Header>
        <Statistic>
          <Statistic.Label>Profit</Statistic.Label>
          <Statistic.Value>
            {profit(currentUserAppointments, currentUserExpenses)}
          </Statistic.Value>
        </Statistic>
        <AnnualChart
          appointmentsDates={appointmentsDates}
          expensesDates={expensesDates}
        />
      </Segment>
    </Segment.Group>
  );
}
