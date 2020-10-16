import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToExpenses } from "../expensesActions";
import ExpensesNav from "../expensesNav/ExpensesNav";
import ExpensesList from "./ExpensesList";
import classes from "../../../css/Dashboard.module.css";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToExpensesFromFirestore } from "../../../app/firestore/firestoreService";

export default function ClientsDashboard() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const { loading } = useSelector((state) => state.async);
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const [predicate, setPredicate] = useState(new Map([["sort", "name"]]));
  const filteredExpenses =
    text === ""
      ? expenses
      : expenses.filter((expense) => handleFilter(expense, textLowered));

  function handleFilter(expense, text) {
    const keys = Object.keys(expense).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = expense[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToExpensesFromFirestore(predicate),
    data: (expenses) => dispatch(listenToExpenses(expenses)),
    deps: [dispatch, predicate],
  });

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <ExpensesNav setText={setText} />
            {loading && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            <ExpensesList
              expenses={filteredExpenses}
              predicate={predicate}
              setPredicate={handleSetPredicate}
              loading={loading}
            />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
