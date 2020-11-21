import React, { useEffect, useState } from "react";
import { confirmEmail } from "../../app/firestore/firestoreService";
import ConfirmEmailNavbar from "./ConfirmEmailNavbar";
import classes from "../../css/Dashboard.module.css";
import { Dimmer, Header, Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function ConfirmEmail({ match }) {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { email, code } = match.params; // from url
  const [checkState, setCheckState] = useState({
    isChecking: true, // loading
    hasConfirmed: false, // if code was good
  });

  function renderConfirmationEmail(checkState) {
    if (checkState.isChecking) {
      return (
        <Dimmer active>
          <Loader indeterminate>registration in progress </Loader>
        </Dimmer>
      );
    }

    if (checkState.hasConfirmed) {
      return (
        <>
          <Header textAlign="center" size="huge">
            Thank you for your registration {currentUserProfile?.displayName}.
          </Header>
          <Header size="medium" textAlign="center">Please enjoy our app.</Header>
        </>
      );
    }

    return (
      <Header textAlign="center" size="huge" color="red">
        You code is not correct. Please check again or contact the admin:
        andrei_vasiloi@yahoo.com
      </Header>
    );
  }

  useEffect(() => {
    confirmEmail(email, code).then((hasSucceded) => {
      setCheckState({ isChecking: false, hasConfirmed: hasSucceded });
    });
  }, [email, code]);

  return (
    <div className={classes.dashboardContainer}>
      <ConfirmEmailNavbar />
      {renderConfirmationEmail(checkState)}
    </div>
  );
}
