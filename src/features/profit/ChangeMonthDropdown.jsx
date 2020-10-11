import React from "react";
import { Dropdown } from "react-bootstrap";

export default function ChangeMonthDropdown({ monthName }) {
  return (
    <>
      <Dropdown.Item onClick={console.log(monthName)} >{monthName}</Dropdown.Item>
    </>
  );
}
