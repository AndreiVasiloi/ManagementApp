import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToExpenseFromFirestore,
  updateExpenseInFirestore,
  addExpenseToFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import { listenToExpenses } from "../expensesActions";

export default function ExpensesForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedExpense = useSelector((state) =>
    state.expense.expenses.find((a) => a.id === match.params.id)
  );
  const { loading } = useSelector((state) => state.async);
  const initialValues = selectedExpense ?? {
    name: "",
    price: "",
    amount: '', 
    purchaseDate: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("You must provide a name"),
    price: Yup.string().required("You must provide a price"),
    purchaseDate: Yup.string().required("You must provide a date"),
    amount: Yup.string().required("You must provide a amount"),
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToExpenseFromFirestore(match.params.id),
    data: (expenses) => dispatch(listenToExpenses([expenses])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedExpense
              ? await updateExpenseInFirestore(values)
              : await addExpenseToFirestore(values);
            history.push("/expenses");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header
              sub
              color='teal'
              content={
                selectedExpense ? "Edit expense" : "Add expense"
              }
            />
            <MyTextInput name='name' placeholder='Name' />
            <MyNumberInput name='price' placeholder='Price' />
            <MyDateInput
              name='purchaseDate'
              placeholderText='Purchase Date'
              dateFormat='MMMM d, yyyy'
              autoComplete='off'
            />
            <MyNumberInput name='amount' placeholder='Amount' />
            <Button
              type='submit'
              floated='right'
              className={classes.formSubmitBtn}
              content='Submit'
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              className={classes.formCancelBtn}
              floated='right'
              content='Cancel'
              as={NavLink}
              to='/expenses'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
