import React from "react";
import { Header, Segment } from "semantic-ui-react";
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
    <Segment.Group
      className={classes.dashboardListContainer}
      style={{ marginTop: "50px" }}
    >
      <Segment>
        <ExpensesListTitles
          predicate={predicate}
          setPredicate={setPredicate}
          loading={loading}
        />
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpensesListItem expense={expense} key={expense.id} />
          ))
        ) : (
          <Header
            size='huge'
            textAlign='center'
            color='teal'
            content='No expenses to display'
          />
        )}
        {}
      </Segment>
    </Segment.Group>
  );
}
