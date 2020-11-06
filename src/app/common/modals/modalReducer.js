const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export function openModal(payload) {
  return {
    type: OPEN_MODAL,
    payload,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

const initialState = {
  showModal: false,
};

export default function modalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_MODAL:
      return { showModal: payload };
    case CLOSE_MODAL:
      return { showModal: payload };
    default:
      return state;
  }
}
