import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { closeRegisterModal, openRegisterModal } from "../../app/common/modals/modalReducer";
import classes from "../../css/HomePage.module.css";
import titleImage from "../../images/homeTitleImage.png";
import RegisterForm from "../auth/RegisterForm";

export default function Title({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowRegisterModal,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <Row>
        <Col lg={6}>
          <h1 className={classes.bigHeading}>
            Designed to help small businesses.
          </h1>
          <Button
          content='Try for free'
          size='huge'
          className={classes.registerButtonContent}
          onClick={() => dispatch(openRegisterModal(true))}
        />
        </Col>
        <Col lg={6}>
          <img
            className={classes.titleImage}
            src={titleImage}
            alt='title'
          ></img>
        </Col>
      </Row>
      <Modal show={showRegisterModal} onHide={() => dispatch(closeRegisterModal(false))}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <RegisterForm />
      </Modal>
    </>
  );
}
