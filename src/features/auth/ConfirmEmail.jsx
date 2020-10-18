import React, { useEffect, useState } from "react";
import { confirmEmail } from "../../app/firestore/firestoreService";

function renderConfirmationEmail(checkState) {
  if (checkState.isChecking) {
    return <div>Please wait. We are confirming your email address... </div>;
  }

  if (checkState.hasConfirmed) {
    return <div style={{color: 'green'}}> Congratulations! You have confirmed your email </div>;
  }

  return (
    <div style={{color: 'red'}}>
      You code is not correct. Please check again or contact the admin:
      craca21@gmail.com
    </div>
  );
}

export default function ConfirmEmail({ match, history }) {
  const { email, code } = match.params; // from url
  const [checkState, setCheckState] = useState({
    isChecking: true, // loading
    hasConfirmed: false, // if code was good
  });

  useEffect(() => {
    confirmEmail(email, code).then(hasSucceded => {
        setCheckState({ isChecking: false, hasConfirmed: hasSucceded });
    });
  }, [email, code]);

  return (
    <div style={{ marginLeft: 200 }}>
      <h1> Confirm email </h1>

      <div>Email: {email}</div>
      <div>Code: {code}</div>

      {renderConfirmationEmail(checkState)}
    </div>
  );
}
