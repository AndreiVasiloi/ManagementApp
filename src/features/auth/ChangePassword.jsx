import { Form, Formik } from 'formik';
import React from 'react'
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function ChangePassword() {
    return (
        <Segment>
        <Header dividing size='large' content='Account' />
        <>
          <Header color='teal' sub content='Change Password' />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword1: '', newPassword2: '' }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required('Password is required'),
              newPassword2: Yup.string().oneOf(
                [Yup.ref('newPassword1'), null],
                'Passwords do not match'
              ),
            })}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                debugger
              try {
                  await updateUserPassword(values);
              } catch (error) {
                  setErrors({auth: error.message}); 
              } finally {
                  setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                <MyTextInput
                  name='newPassword1'
                  type='password'
                  placeholder='New Password'
                />
                <MyTextInput
                  name='newPassword2'
                  type='password'
                  placeholder='Confirm Password'
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
                  style={{display: 'block'}}
                  type='submit'
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size='large'
                  positive
                  content='Update password'
                />
              </Form>
            )}
          </Formik>
        </>
        </Segment>
    )
}
