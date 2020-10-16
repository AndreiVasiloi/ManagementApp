import { FETCH_CLIENT } from "./clientsConstants";

const initialState = {
  clients: [],
};

export default function clientsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
      case FETCH_CLIENT:
        return {
          ...state,
          clients: payload,
        };
    default:
      return state;
  }

}

