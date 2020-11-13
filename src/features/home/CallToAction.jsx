import React from "react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { closeModal, openModal } from "../../app/common/modals/modalReducer";
import classes from "../../css/HomePage.module.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

export default function CallToAction({
  showModal, formToDisplay ,setFormToDisplay
}) {
  const dispatch = useDispatch();
  const loginTitle = 'LOGIN';
  const registerTitle = 'REGISTER';
  return (
    <>
      <Container fluid className={classes.containerFluid}>
        <h3 className={classes.bigHeading}>
          Find the Best Tool for Your Business Today.
        </h3>
        <Button
          content='Try for free'
          size='huge'
          className={classes.registerButtonContent}
          onClick={() => {
            dispatch(openModal(true));
            setFormToDisplay("register");
          }}
        />
      </Container>
      <Modal show={showModal} onHide={() => dispatch(closeModal(false))}>
        <Modal.Header closeButton>
        <Modal.Title>{formToDisplay === "login" ? loginTitle : registerTitle}</Modal.Title> 
        </Modal.Header>
        {formToDisplay === "login" ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </>
  );
}
