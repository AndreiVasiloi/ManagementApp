import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "./testReducer";
import { openModal } from "../../app/common/modals/modalReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  return (
    <>
      <div style={{marginLeft: '200px'}}>
        <h1>Testing 123</h1>
        <h3>The data is: {data}</h3>
        <Button
          name='increment'
          loading={loading && target === "increment"}
          onClick={(e) => {
            dispatch(increment(20));
            setTarget(e.target.name);
          }}
          content='Increment'
          color='green'
        />
        <Button
          name='decrement'
          loading={loading && target === "decrement"}
          onClick={(e) => {
            dispatch(decrement(10));
            setTarget(e.target.name);
          }}
          content='Decrement'
          color='red'
        />
        <Button
          onClick={() =>
            dispatch(
              openModal({ modalType: "TestModal", modalProps: { data } })
            )
          }
          content='Open Modal'
          color='teal'
        />

      </div>
    </>
  );
}
