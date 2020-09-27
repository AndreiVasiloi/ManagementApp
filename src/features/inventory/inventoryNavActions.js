import { ADD_ACTIVE_CLASS, ADD_FILTER_ICON, ADD_RESPONSIVE_CLASS } from "./inventoryConstants";

export function addResponsiveClass(setClass) {
  return {
    type: ADD_RESPONSIVE_CLASS,
    payload: setClass,
  };
}

export function addFilterIcon(icon) {
  return {
    type: ADD_FILTER_ICON,
    payload: icon,
  };
}

export function addActiveClass(link) {
  return {
    type: ADD_ACTIVE_CLASS,
    payload: link,
  };
}

