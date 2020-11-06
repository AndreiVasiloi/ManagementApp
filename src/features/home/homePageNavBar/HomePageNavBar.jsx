import React from "react";
import { Button, Modal, Nav, Navbar } from "react-bootstrap";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/RegisterForm";
import classes from "../../../css/HomePage.module.css";
import { useDispatch } from "react-redux";
import {
  closeLoginModal,
  closeRegisterModal,
  openLoginModal,
  openRegisterModal,
} from "../../../app/common/modals/modalReducer";

export default function HomePageNavBar({ showLoginModal, showRegisterModal }) {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        className={classes.homePageNavContainer}
      >
        <Navbar.Brand href='#home' className={classes.homePageNavBrand}>
          reverto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          <Nav className={classes.homePageNavItem}>
            <Nav.Link href='#footer' className={classes.homePageNavLink}>
              Contact
            </Nav.Link>
            <Nav.Link
              className={classes.homePageNavLink}
              onClick={() => dispatch(openLoginModal(true))}
            >
              Login
            </Nav.Link>
            <Button
              className={classes.homePageNavRegisterButton}
              onClick={() => dispatch(openRegisterModal(true))}
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={showLoginModal}
        onHide={() => dispatch(closeLoginModal(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <LoginForm />
      </Modal>
      <Modal
        show={showRegisterModal}
        onHide={() => dispatch(closeRegisterModal(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <RegisterForm />
      </Modal>
    </>
  );
}
