import { ADD_ACTIVE_CLASS, ADD_FILTER_ICON, ADD_RESPONSIVE_CLASS } from "./inventoryConstants";

const initialState = {
  responsiveClass: true,
  filterIcon: 'expirationDate',
  activeClass: 'inventory'
};

export default function inventoryNavReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_RESPONSIVE_CLASS:
      return {
        ...state,
        responsiveClass: payload
      };
      case ADD_FILTER_ICON:
        return {
          ...state,
          filterIcon: payload
        };
        case ADD_ACTIVE_CLASS:
          return {
            ...state,
            activeClass: payload
          };
    default:
      return state;
  }
}
