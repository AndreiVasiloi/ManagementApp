import { FETCH_EXPENSE } from "./expensesConstants";

export function listenToExpenses(expenses) {
    return {
      type: FETCH_EXPENSE,
      payload: expenses,
    };
  }
