import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToReasonsFromFirestore,
  updateAppointmentInFirestore,
  addAppointmentToFirestore,
  listenToAppointmentFromFirestore,
  listenToAppointmentsFromFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToReasons } from "../reasonsActions";
import { listenToAppointments } from "../appointmentsActions";

export default function AppointmentsForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const reasons = useSelector((state) => state.reason.reasons);
  const { appointments } = useSelector((state) => state.appointment);
  const selectedAppointment = useSelector((state) =>
    state.appointment.appointments.find((a) => a.id === match.params.id)
  );
  const { loading } = useSelector((state) => state.async);
  const initialValues = selectedAppointment ?? {
    hour: "",
    date: "",
    name: "",
    reason: "",
  };
  const currentUserReasons = reasons.filter(
    (reason) => reason?.userUid === currentUser?.uid
  );

  const currentUserAppointments = appointments.filter(
    (appointment) => appointment?.userUid === currentUser?.uid
  );

  const newReasons = currentUserReasons.map((reason) => ({
    value: reason.value,
    text: reason.text,
    id: reason.id,
  }));

  const validationSchema = Yup.object({
    hour: Yup.string().required("You must provide a hour"),
    date: Yup.string().required("You must provide a date"),
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
    query: () => listenToAppointmentFromFirestore(match.params.id),
    data: (appointment) => dispatch(listenToAppointments([appointment])),
    deps: [match.params.id, dispatch],
  });

  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;
  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const searchDuplicateAppointment = currentUserAppointments.filter(
              (appointment) =>
                appointment.hour.getHours() === values.hour.getHours() &&
                appointment.hour.getMinutes() === values.hour.getMinutes() &&
                appointment.date.getTime() === values.date.getTime()
            );
            if (searchDuplicateAppointment.length === 0) {
              selectedAppointment
                ? await updateAppointmentInFirestore(values)
                : await addAppointmentToFirestore(values);
              history.push("/appointments");
            } else {
              toast.error("Appointment already made at the same time");
              setSubmitting(false);
            }
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
              options={newReasons}
            />
            <MyTextInput name="name" placeholder="Name" />
            <MyDateInput
              name="hour"
              placeholderText="Appointment Hour"
              timeFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="time"
              dateFormat="HH:mm"
              autoComplete="off"
            />
            <MyDateInput
              name="date"
              placeholderText="Appointment date"
              dateFormat="MMMM d, yyyy"
              autoComplete="off"
            />
            <Button
              type="submit"
              floated="right"
              className={classes.formSubmitBtn}
              content="Submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.formCancelBtn}
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
