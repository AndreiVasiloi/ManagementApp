import React from "react";
import {  Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";

export default function SignedOutMenu() {
  const dispatch = useDispatch();
  return (
    <>
      <Button variant='success' onClick={() => dispatch(openModal({modalType: 'LoginForm'}))}>
        Login
      </Button>
      <Button variant='success'>Register</Button>
      </>
  );
}
