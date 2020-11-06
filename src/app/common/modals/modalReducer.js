const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
const OPEN_REGISTER_MODAL = "OPEN_REGISTER_MODAL";
const CLOSE_REGISTER_MODAL = "CLOSE_REGISTER_MODAL";

export function openLoginModal(payload) {
  return {
    type: OPEN_LOGIN_MODAL,
    payload,
  };
}

export function openRegisterModal(payload) {
  return {
    type: OPEN_REGISTER_MODAL,
    payload,
  };
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL,
  };
}

export function closeRegisterModal() {
  return {
    type: CLOSE_REGISTER_MODAL,
  };
}

const initialState = {
  showLoginModal: false,
  showRegisterModal: false,
};

export default function modalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_LOGIN_MODAL:
      return { showLoginModal: payload };
    case CLOSE_LOGIN_MODAL:
      return { showLoginModal: payload };
    case OPEN_REGISTER_MODAL:
      return { showRegisterModal: payload };
    case CLOSE_REGISTER_MODAL:
      return { showRegisterModal: payload };
    // case OPEN_MODAL:
    //   const { modalType, modalProps } = payload;
    //   return { modalType, modalProps };
    // case CLOSE_MODAL:
    //   return null;
    // case OPEN_REGISTER_MODAL:
    //   return { showRegisterModal: true };
    // case CLOSE_REGISTER_MODAL:
    //   return { showRegisterModal: false };
    default:
      return state;
  }
}
