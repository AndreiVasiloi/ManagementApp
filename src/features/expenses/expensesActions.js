import {
  FETCH_EXPENSE,
  LISTEN_TO_EXPENSES_MONTH,
  LISTEN_TO_EXPENSES_YEAR,
  LISTEN_TO_EXPENSES_CUSTOM_DATES,
} from "./expensesConstants";

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

export function getExpensesYear(year) {
  return {
    type: LISTEN_TO_EXPENSES_YEAR,
    payload: year,
  };
}

export function getExpensesCustomDates(customDate) {
  return {
    type: LISTEN_TO_EXPENSES_CUSTOM_DATES,
    payload: customDate,
  };
}
