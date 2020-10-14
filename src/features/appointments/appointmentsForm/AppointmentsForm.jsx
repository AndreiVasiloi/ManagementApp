import React, { useEffect } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink} from "react-router-dom";
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
  listenToAppointmentFromFirestore
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToReasons } from "../reasonsActions";
import { clearSelectedAppointment, listenToSelectedAppointment } from "../appointmentsActions";

export default function AppointmentsForm({ match, history, location }) {
  const dispatch = useDispatch();
  const reasons = useSelector((state) => state.reason.reasons);
  const selectedAppointment = useSelector((state) =>
    state.appointment.appointments.find((a) => a.id === match.params.id)
  );

  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/createAppointment') return;
    dispatch(clearSelectedAppointment());
  }, [dispatch, location.pathname])

  const initialValues = selectedAppointment ?? {
    hour: "",
    date: "",
    name: "",
    reason: "",
  };

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
    shouldExecute: match.params.id !== selectedAppointment?.id && location.pathname !== '/createAppointment',
    query: () => listenToAppointmentFromFirestore(match.params.id),
    data: (appointment) => dispatch(listenToSelectedAppointment(appointment)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // function getPrice(reasontype) {
          //   debugger
          //   const reason = reasons.find(reason => reason.text === reasontype);
          //   if(reason !== undefined){
          //     return reason.price;
          //   }
          // }
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
          <Form className='ui form'>
            <Header
              sub
              color='teal'
              content={
                selectedAppointment ? "Edit appointment" : "Add appointment"
              }
            />
            <MySelectInput
              name='reason'
              placeholder='Reason'
              options={reasons}
            />
            <MyTextInput name='name' placeholder='Name' />
            <MyDateInput
              name='hour'
              placeholderText='Appointment Hour'
              timeFormat='HH:mm'
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption='time'
              dateFormat='HH:mm'
              autoComplete='off'
            />
            <MyDateInput
              name='date'
              placeholderText='Appointment date'
              dateFormat='MMMM d, yyyy'
              autoComplete='off'
            />
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
              to='/appointments'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
