import React from "react";
import { Segment } from "semantic-ui-react";
import ExpensesListTitles from "./ExpensesListTitles";
import ExpensesListItem from "./ExpensesListItem";
import classes from "../../../css/Dashboard.module.css";

export default function ExpensesList({
  expenses,
  predicate,
  setPredicate,
  loading,
}) {
  return (
    <Segment.Group className={classes.dashboardListContainer}>
      <Segment>
        <ExpensesListTitles
          predicate={predicate}
          setPredicate={setPredicate}
          loading={loading}
        />
        {expenses.map((expense) => (
          <ExpensesListItem expense={expense} key={expense.id} />
        ))}
      </Segment>
    </Segment.Group>
  );
}
