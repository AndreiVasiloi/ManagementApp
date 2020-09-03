import React from "react";
import { Nav, Button } from "react-bootstrap";

export default function SignedOutMenu({setAuthenticated}) {
  return (
    <Nav>
      <Button variant='success' onClick={() => setAuthenticated(true)}>
        Login
      </Button>
      <Button variant='success'>Register</Button>
    </Nav>
  );
}
