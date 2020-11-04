import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import classes from "../../css/HomePage.module.css";
import titleImage from "../../images/homeTitleImage.png";
import RegisterForm from "../auth/RegisterForm";

export default function Title({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowRegisterModal,
}) {
  return (
    <>
      <Row>
        <Col lg={6}>
          <h1 className={classes.bigHeading}>
            Designed to help small business.
          </h1>
          <Button
          content='Try for free'
          size='huge'
          className={classes.registerButtonContent}
          onClick={handleShowRegisterModal}
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
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <RegisterForm />
      </Modal>
    </>
  );
}
