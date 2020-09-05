import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateItem, createItem } from "../inventoryItemsActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function InventoryItemForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) =>
    state.item.items.find((i) => i.id === match.params.id)
  );

  const initialValues = selectedItem ?? {
    category: "",
    name: "",
    price: "",
    expirationDate: "",
    amount: "",
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("You must provide a category"),
    name: Yup.string().required("You must provide a name"),
    price: Yup.string().required("You must provide a price"),
    expirationDate: Yup.string().required(),
    amount: Yup.string().required(),
  });

  return (
    <Segment clearing style={{ marginTop: "50px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedItem
            ? dispatch(updateItem({ ...selectedItem, ...values }))
            : dispatch(createItem({ ...values, id: cuid() }));
          history.push("/inventory");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Add item' />
            <MySelectInput
              name='category'
              placeholder='Category'
              options={categoryData}
            />
            <MyTextInput name='name' placeholder='Name' />
            <MyTextInput name='price' placeholder='Price' />
            <MyDateInput
              name='expirationDate'
              placeholderText='Expiration Date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            <MyTextInput name='amount' placeholder='Amount' />
            <Button
              type='submit'
              floated='right'
              positive
              content='Submit'
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              floated='right'
              content='Cancel'
              as={NavLink}
              to='/inventory'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
