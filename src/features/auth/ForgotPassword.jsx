import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { resetPassword } from "../../app/firestore/firebaseService";
import classes from "../../css/Form.module.css";
import { Link } from "react-router-dom";
import { closeModal } from "../../app/common/modals/modalReducer";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().required().email(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await resetPassword(values);
          setSubmitting(false);
          dispatch(closeModal());
          history.push("/");
        } catch (error) {
          setErrors({ auth: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Segment clearing className={classes.forgotPasswordFormContainer}>
          <Form className="ui form">
            <div className={classes.resetPasswordContainer}>
              <Header content="RESET PASSWORD" align="center" />
              <MyTextInput name="email" placeholder="Email Address" />
              {errors.auth && (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                floated="right"
                className={classes.formSubmitBtn}
                color="teal"
                content="Recover Password"
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className={classes.formCancelBtn}
                floated="right"
                content="Cancel"
                as={Link}
                to="/"
              />
            </div>
          </Form>
        </Segment>
      )}
    </Formik>
  );
}
