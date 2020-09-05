import React from "react";
import { Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";

export default function SignedOutMenu({setAuthenticated}) {
  const dispatch = useDispatch();
  return (
    <Nav>
      <Button variant='success' onClick={() => dispatch(openModal({modalType: 'LoginForm'}))}>
        Login
      </Button>
      <Button variant='success'>Register</Button>
    </Nav>
  );
}
