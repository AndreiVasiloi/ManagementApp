import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToReasonsFromFirestore, updateReasonInFirestore, addReasonToFirestore } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from '../../../css/Form.module.css';
import { listenToReasons } from "../reasonsActions";

export default function AppointmentsReasonsForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedReason = useSelector((state) =>
    state.reason.reasons.find((c) => c.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedReason ?? {
    text: "",
    value: ''
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("You must provide a reason"),
  });


  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToReasonsFromFirestore(match.params.id),
    data: (reason) => dispatch(listenToReasons([reason])),
    deps: [match.params.id, dispatch],
  });

  if (loading)
  return <LoadingComponent content='Loading event...' />;

// if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedReason
              ? await updateReasonInFirestore(values)
              : await addReasonToFirestore(values)
            history.push("/appointmentsReasons");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form' >
            <Header sub color='teal' content= {selectedReason ? 'Edit reason' :'Add reason' }/>
            <MyTextInput name='text' placeholder='Reason' />
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