import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Divider, Header, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
// import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";
import firebase from "../../app/config/firebase";
import classes from "../../css/AuthForm.module.css";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const queryUsers = firebase.firestore().collection("users");
          await queryUsers.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const userEmail = doc.data().email;
              const hasConfirmedEmail = doc.data().hasConfirmedEmail;
              if (userEmail === values.email && hasConfirmedEmail === true) {
                signInWithEmail(values);
                setSubmitting(false);
                // dispatch(closeModal());
                history.push("/appointments");
              } else {
                setErrors({ auth: "Please confirm your email address first." });
                setSubmitting(false);
              }
            });
          });
        } catch (error) {
          setErrors({ auth: { auth: "Problem with username or password" } });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='ui form'>
          <div className={classes.authFormContainer}>
            <MyTextInput name='email' placeholder='Email Address' />
            <MyTextInput
              name='password'
              placeholder='Password'
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
              className={classes.authSubmitButton}
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
            <Divider horizontal className={classes.dividerText}>
              Or login with
            </Divider>
            <SocialLogin />
          </div>
        </Form>
      )}
    </Formik>
    // <ModalWrapper size='mini' header='Sign in'>
    //   <Formik
    //     initialValues={{ email: "", password: "" }}
    //     validationSchema={Yup.object({
    //       email: Yup.string().required().email(),
    //       password: Yup.string().required(),
    //     })}
    //     onSubmit={async (values, { setSubmitting, setErrors }) => {
    //       try {
    //         const queryUsers = firebase.firestore().collection("users");
    //          await queryUsers.get().then((querySnapshot) => {
    //           querySnapshot.forEach((doc) => {
    //             const userEmail = doc.data().email;
    //             const hasConfirmedEmail = doc.data().hasConfirmedEmail;
    //             if(userEmail === values.email && hasConfirmedEmail === true) {
    //               signInWithEmail(values);
    //               setSubmitting(false);
    //               dispatch(closeModal());
    //               history.push('/appointments')
    //             }else {
    //               setErrors({ auth: "Please confirm your email address first." });
    //               setSubmitting(false);
    //             }
    //           });
    //         });
    //       } catch (error) {
    //         setErrors({ auth: 'Problem with username or password' });
    //         setSubmitting(false);
    //       }
    //     }}
    //   >
    //     {({ isSubmitting, isValid, dirty, errors }) => (
    //       <Form className='ui form'>
    //         <MyTextInput name='email' placeholder='Email Address' />
    //         <MyTextInput
    //           name='password'
    //           placeholder='Password'
    //           type='password'
    //         />
    //         {errors.auth && (
    //           <Label
    //             basic
    //             color='red'
    //             style={{ marginBottom: 10 }}
    //             content={errors.auth}
    //           />
    //         )}
    //         <Button
    //           loading={isSubmitting}
    //           disabled={!isValid || !dirty || isSubmitting}
    //           type='submit'
    //           fluid
    //           size='large'
    //           color='teal'
    //           content='Login'
    //         />
    //         <Divider horizontal>Or</Divider>
    //         <SocialLogin/>
    //       </Form>
    //     )}
    //   </Formik>
    // </ModalWrapper>
  );
}
