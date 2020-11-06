import React from "react";
import { Container, Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import classes from "../../css/HomePage.module.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

export default function CallToAction({
  handleShowLoginModal,
  handleShowRegisterModal,
  handleCloseLoginModal,
  handleCloseRegisterModal,
  showLoginModal,
  showRegisterModal,
}) {
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
          onClick={handleShowRegisterModal}
        />
      </Container>
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <RegisterForm />
      </Modal>
    </>
  );
}
