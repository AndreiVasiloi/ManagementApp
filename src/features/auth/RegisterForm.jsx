import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import classes from "../../css/AuthForm.module.css";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ displayName: "", email: "", password: "" }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {

        if (values.confirmPassword === values.password) {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        } else {
          setErrors({ auth: "Passwords don`t match" });
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='ui form'>
          <div className={classes.authFormContainer}>
            <MyTextInput name='displayName' placeholder='Display Name' />
            <MyTextInput name='email' placeholder='Email Address' />
            <MyTextInput
              name='password'
              placeholder='Password'
              type='password'
            />
              <MyTextInput
              name='confirmPassword'
              placeholder='Confirm Password'
              type='password'
            />
            {errors.auth && (
              <Label
                basic
                color='red'
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Register'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </div>
        </Form>
      )}
    </Formik>
  );
}
