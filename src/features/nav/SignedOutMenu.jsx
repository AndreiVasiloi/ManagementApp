import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../app/common/modals/modalReducer";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

export default function SignedOutMenu() {
  const dispatch = useDispatch();
  const [formToDisplay, setFormToDisplay] = useState();
  const { showModal } = useSelector((state) => state.modals);
  return (
    <>
      <Button
        variant='success'
        onClick={() => {
          dispatch(openModal(true));
          setFormToDisplay("login");
        }}
      >
        Login
      </Button>
      <Button
        variant='success'
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
      >
        Register
      </Button>
      <Modal show={showModal} onHide={() => dispatch(closeModal(false))}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        {formToDisplay === "login" ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </>
  );
}
