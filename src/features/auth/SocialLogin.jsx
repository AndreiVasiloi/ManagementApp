import React from "react";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";
import { useHistory } from "react-router-dom";

export default function SocialLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
    history.push('/appointments')
  }

  return (
    <>
      <Button
        onClick={() => {
          handleSocialLogin("facebook")

        }}
        icon='facebook'
        fluid
        color='facebook'
        style={{ marginBottom: 10 }}
        content='Login with Facebook'
      />
      <Button
        onClick={() => handleSocialLogin("google")}
        icon='google'
        fluid
        color='google plus'
        content='Login with Google'
      />
    </>
  );
}
