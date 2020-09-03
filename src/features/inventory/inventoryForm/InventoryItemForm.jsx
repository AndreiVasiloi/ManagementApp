import React, { useState } from "react";
import { Segment, Form, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateItem, createItem } from "../inventoryItemsActions";

export default function InventoryItemForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) =>
    state.item.items.find((i) => i.id === match.params.id)
  );

  const initialItems = selectedItem ?? {
    category: "",
    name: "",
    price: "",
    expirationDate: "",
    amount: "",
  };
  const [values, setValues] = useState(initialItems);

  function handleFormSubmit() {
    selectedItem
      ? dispatch(updateItem({ ...selectedItem, ...values }))
      : dispatch(createItem({ ...values, id: cuid() }));
      history.push('/inventory')
  }

  function handleInputChange(i) {
    const { name, value } = i.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={selectedItem ? "Edit the item" : "Create a new item"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Category title"
            name="category"
            value={values.category}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={values.price}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Expiration date"
            name="expirationDate"
            value={values.expirationDate}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            value={values.amount}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          as={NavLink}
          to="/inventory"
        />
      </Form>
    </Segment>
  );
}
