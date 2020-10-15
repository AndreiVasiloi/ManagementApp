import React, { useEffect } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToReasonFromFirestore,
  updateReasonInFirestore,
  addReasonToFirestore,
  listenToReasonsFromFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import {
  clearSelectedReason,
  listenToReasons,
  listenToSelectedReason,
} from "../reasonsActions";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import MyColorPicker from "../../../app/common/form/MyColorPicker";

export default function AppointmentsReasonsForm({ match, history, location }) {
  const dispatch = useDispatch();
  // const { selectedReason } = useSelector((state) => state.reason);
  const selectedReason = useSelector((state) =>
  state.reason.reasons.find((c) => c.id === match.params.id)
);
  const { loading } = useSelector((state) => state.async);

  // useEffect(() => {
  //   if (location.pathname !== "/createReason") return;
  //   dispatch(clearSelectedReason());
  // }, [dispatch, location.pathname]);

  const initialValues = selectedReason ?? {
    text: "",
    value: "",
    price: "",
    reasonColor: "",
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

  // useFirestoreDoc({
  //   shouldExecute:
  //     match.params.id !== selectedReason?.id &&
  //     location.pathname !== "/createReason",
  //   query: () => listenToReasonFromFirestore(match.params.id),
  //   data: (reason) => dispatch(listenToSelectedReason(reason)),
  //   deps: [match.params.id, dispatch],
  // });

  if (loading) return <LoadingComponent content="Loading event..." />;

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
          <Form className="ui form">
            <Header
              sub
              color="teal"
              content={selectedReason ? "Edit reason" : "Add reason"}
            />
            <MyTextInput name="text" placeholder="Reason" />
            <MyNumberInput name="price" placeholder="Price" />
            <Header content="Pick a reason color" />
            <MyColorPicker name="reasonColor" />
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
              to="/appointmentsReasons"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
