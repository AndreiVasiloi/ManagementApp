import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  updateReasonInFirestore,
  addReasonToFirestore,
  listenToReasonsFromFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import { listenToReasons } from "../reasonsActions";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import MyColorPicker from "../../../app/common/form/MyColorPicker";

export default function AppointmentsReasonsForm({ match, history, location }) {
  const dispatch = useDispatch();
  const selectedReason = useSelector((state) =>
    state.reason.reasons.find((c) => c.id === match.params.id)
  );
  const { loading } = useSelector((state) => state.async);
  const initialValues = selectedReason ?? {
    text: "",
    value: "",
    price: "",
    reasonColor: "",
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("You must provide a reason"),
    price: Yup.string().required("You must provide a price"),
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToReasonsFromFirestore(match.params.id),
    data: (reason) => dispatch(listenToReasons([reason])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedReason
              ? await updateReasonInFirestore(values)
              : await addReasonToFirestore(values);
            history.push("/appointmentsReasons");
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
              content={selectedReason ? "Edit reason" : "Add reason"}
            />
            <MyTextInput name='text' placeholder='Reason' />
            <MyNumberInput name='price' placeholder='Price' />
            <Header content='Pick a reason color for displaying your text' />
            <MyColorPicker name='reasonColor' />
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
              to='/appointmentsReasons'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
