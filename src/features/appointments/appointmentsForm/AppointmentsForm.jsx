import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToReasonsFromFirestore,
  listenToAppointmentsFromFirestore,
  updateAppointmentInFirestore,
  addAppointmentToFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "./AppointmentsForm.module.css";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToReasons } from "../reasonsActions";
import { listenToAppointments } from "../appointmentsActions";

export default function AppointmentsForm({ match, history }) {
    
  const dispatch = useDispatch();
  const reasons = useSelector((state) => state.reason.reasons);
  const selectedAppointment = useSelector((state) =>
    state.appointment.appointments.find((a) => a.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedAppointment ?? {
    hour: "",
    name: "",
    reason: "",
  };

  const validationSchema = Yup.object({
    hour: Yup.string().required("You must provide a hour"),
    name: Yup.string().required("You must provide a name"),
    reason: Yup.string().required("You must provide a reason"),
  });

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToAppointmentsFromFirestore(match.params.id),
    data: (appointment) => dispatch(listenToAppointments([appointment])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

//   if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing className={classes.inventoryFormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedAppointment
              ? await updateAppointmentInFirestore(values)
              : await addAppointmentToFirestore(values);
            history.push("/appointments");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header
              sub
              color="teal"
              content={
                selectedAppointment ? "Edit appointment" : "Add appointment"
              }
            />
            <MySelectInput
              name="reason"
              placeholder="Reason"
              options={reasons}
            />
            <MyTextInput name="name" placeholder="Name" />
            <MyDateInput
              name="hour"
              placeholderText="Appointment Date"
              dateFormat="MMMM d, yyyy"
            />
            <Button
              type="submit"
              floated="right"
              className={classes.inventoryFormSubmitBtn}
              content="Submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.inventoryFormCancelBtn}
              floated="right"
              content="Cancel"
              as={NavLink}
              to="/appointments"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
