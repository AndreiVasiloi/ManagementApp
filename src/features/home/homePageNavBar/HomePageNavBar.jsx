import React from "react";
import { Button, Modal, Nav, Navbar } from "react-bootstrap";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/RegisterForm";
import classes from "../../../css/HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../app/common/modals/modalReducer";
import { useHistory } from "react-router-dom";

export default function HomePageNavBar({
  showModal,
  formToDisplay,
  setFormToDisplay,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  const loginTitle = 'LOGIN';
  const registerTitle = 'REGISTER';
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        className={classes.homePageNavContainer}
        variant="dark"
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
              onClick={() => {
                if(authenticated) {
                  history.push('/appointments')
                }else {
                  dispatch(openModal(true));
                  setFormToDisplay("login");
                }
              }}
            >
              Login
            </Nav.Link>
            <Button
              className={classes.homePageNavRegisterButton}
              onClick={() => {
                dispatch(openModal(true));
                setFormToDisplay("register");
              }}
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={showModal}
        onHide={() => dispatch(closeModal(false))}
      >
        <Modal.Header closeButton>
            <Modal.Title>{formToDisplay === "login" ? loginTitle : registerTitle}</Modal.Title> 
        </Modal.Header>
        {formToDisplay === "login" ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </>
  );
}
