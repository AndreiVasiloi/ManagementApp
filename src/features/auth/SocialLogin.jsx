import React from "react";
import { Button, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
// import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";
import { useHistory } from "react-router-dom";
import googleIcon from "../../images/google-icon.svg";
import facebookIcon from "../../images/facebook.png";
import classes from "../../css/AuthForm.module.css";

export default function SocialLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  function handleSocialLogin(provider) {
    // dispatch(closeModal());
    socialLogin(provider);
    history.push("/appointments");
  }

  return (
    <>
      <div className={classes.socialLoginButtonsContainer}>
        <div
          className={classes.socialLoginButton}
          onClick={() => handleSocialLogin("google")}
        >
          <img
            className={classes.socialLoginIcon}
            src={googleIcon}
            alt='google icon'
          />
        </div>
        <div
          className={classes.socialLoginButton}
          onClick={() => {
            handleSocialLogin("facebook");
          }}
        >
          <img
            className={classes.socialLoginIcon}
            src={facebookIcon}
            alt='facebook icon'
          />
        </div>
      </div>

      {/* <Button
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
      /> */}
    </>
  );
}
