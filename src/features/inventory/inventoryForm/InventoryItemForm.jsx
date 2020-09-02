import React, { useState } from "react";
import { Segment, Form, Header, Button } from "semantic-ui-react";

export default function InventoryItemForm({ setFormOpen, setItems }) {
  const initialItems = {
    category: "",
    name: "",
    price: "",
    expirationDate: "",
    amount: "",
  };
  const [itemsValues, setItemsValues] = useState(initialItems);

  function handleFormSubmit() {
    console.log(itemsValues);
  }

  function handleInputChange(i) {
    const { name, value } = i.target;
    setItemsValues({ ...itemsValues, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content='Create a new categpry item' />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type='text'
            placeholder='Category title'
            name='category'
            value={itemsValues.category}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={itemsValues.name}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Price'
            name='price'
            value={itemsValues.price}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            placeholder='Expiration date'
            name='expirationDate'
            value={itemsValues.expirationDate}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Amount'
            name='amount'
            value={itemsValues.amount}
            onChange={(i) => handleInputChange(i)}
          />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          type='submit'
          floated='right'
          content='Cancel'
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}
