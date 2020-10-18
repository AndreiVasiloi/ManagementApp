import { FETCH_EXPENSE, LISTEN_TO_EXPENSES_MONTH } from "./expensesConstants";

const initialState = {
  expenses: [],
  expensesMonth: []
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
    default:
      return state;
  }

}
