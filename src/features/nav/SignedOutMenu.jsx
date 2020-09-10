import React from "react";
import {  Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";
import { Link } from "react-router-dom";

export default function SignedOutMenu({setAuthenticated}) {
  const dispatch = useDispatch();
  return (
    <Link>
      <Button variant='success' onClick={() => dispatch(openModal({modalType: 'LoginForm'}))}>
        Login
      </Button>
      <Button variant='success'>Register</Button>
    </Link>
  );
}
