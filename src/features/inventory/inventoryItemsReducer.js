import {CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./inventoryConstants";

const { sampleData } = require("../../app/api/sampleData");

const initialState = {
  items: sampleData,
};

export default function inventoryReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [...state.items.filter(itm => itm.id !== payload.id), payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter(itm => itm.id !== payload)],
      };
    default:
      return state;
  }
}
