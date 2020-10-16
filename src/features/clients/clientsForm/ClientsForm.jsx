import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToClientFromFirestore,
  updateClientInFirestore,
  addClientToFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import { listenToClients } from "../clientsActions";

export default function ClientsForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedClient = useSelector((state) =>
    state.client.clients.find((a) => a.id === match.params.id)
  );
  const { loading } = useSelector((state) => state.async);
  const initialValues = selectedClient ?? {
    name: "",
    phoneNumber: "",
    email: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("You must provide a name"),
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToClientFromFirestore(match.params.id),
    data: (clients) => dispatch(listenToClients([clients])),
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
            selectedClient
              ? await updateClientInFirestore(values)
              : await addClientToFirestore(values);
            history.push("/clients");
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
                selectedClient ? "Edit client" : "Add client"
              }
            />
            <MyTextInput name='name' placeholder='Name' />
            <MyTextInput name='email' placeholder='Email Address' />
            <MyNumberInput name='phoneNumber' placeholder='Phone Number' />
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
              to='/clients'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
