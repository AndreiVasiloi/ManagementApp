import React from "react";
import { Button } from "semantic-ui-react";

export default function HomePage({history}) {
  return (
    <>
      <h1>Home page</h1>
      <Button content='Login' onClick={() => history.push('/inventory')}/>
    </>
  );
}
