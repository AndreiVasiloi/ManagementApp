import { FETCH_EXPENSE } from "./expensesConstants";

const initialState = {
  expenses: [],
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
    default:
      return state;
  }

}
