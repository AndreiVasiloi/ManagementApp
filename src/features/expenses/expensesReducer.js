import {
  FETCH_EXPENSE,
  LISTEN_TO_EXPENSES_MONTH,
  LISTEN_TO_EXPENSES_YEAR,
  LISTEN_TO_EXPENSES_CUSTOM_DATES,
} from "./expensesConstants";

const initialState = {
  expenses: [],
  expensesMonth: [],
  expensesYear: [],
  expensesCustomDate: [],
};

export default function expensesReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_EXPENSE:
      return {
        ...state,
        expenses: payload,
      };
    case LISTEN_TO_EXPENSES_MONTH:
      return {
        ...state,
        expensesMonth: payload,
      };
    case LISTEN_TO_EXPENSES_YEAR:
      return {
        ...state,
        expensesYear: payload,
      };
    case LISTEN_TO_EXPENSES_CUSTOM_DATES:
      return {
        ...state,
        expensesCustomDate: payload,
      };
    default:
      return state;
  }
}
