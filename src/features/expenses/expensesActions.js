import { FETCH_EXPENSE, LISTEN_TO_EXPENSES_MONTH } from "./expensesConstants";

export function listenToExpenses(expenses) {
    return {
      type: FETCH_EXPENSE,
      payload: expenses,
    };
  }

  export function getExpensesMonth(month) {
    return {
      type: LISTEN_TO_EXPENSES_MONTH,
      payload: month,
    };
  }