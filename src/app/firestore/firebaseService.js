import { toast } from "react-toastify";
import cuid from "cuid";
import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}


function sendConfirmEmail(email, confirmEmailCode) {
  // TODO: check if you need to user encodeURIComponent / decodeURIComponent
  const confirmUrl = `https://managementapp-d440e.firebaseapp.com/confirmEmail/${email}/${confirmEmailCode}`;

  return firebase
    .firestore()
    .collection("mail")
    .add({
      to: email,
      message: {
        subject: "Confirm email - registration on Reverto",
        text: `Thank you for registering on our app! Please confirm you email by clicking on this url ${confirmUrl}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Email Template</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin: 0; padding: 0; background-color: #f3f3f3">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="700"
              style="border-collapse: collapse"
            >
              <tr>
                <td align="center" bgcolor="#006a71" style="padding: 20px 0 20px 0">
                  <img
                    src="https://i.ibb.co/b54MVX1/confirm-Email.png"
                    alt="Creating Email Magic."
                    style="display: block"
                  />
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td>
                        <h1
                          style="
                            text-align: center;
                            font-family: 'Arial Black', Gadget, sans-serif;
                            color: #4c4c4c;
                            font-weight: bold;
                          "
                        >
                          Email Confirmation
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 0 30px 0">
                        <p
                          style="
                            margin: 0;
                            color: #8d8d8d;
                            font-size: 130%;
                            text-align: center;
                          "
                        >
                          Hey, you\`re almost ready to start enjoying Reverto.<br />
                          Simply click the big turquoise button below to verify your
                          email address.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="border-collapse: collapse"
                        >
                          <tr>
                            <td style="font-size: 0; line-height: 0;" width="20"></td>
                            <td  width="260" align="center">
                              <a href="${confirmUrl}" style="text-decoration: none; text-align: center">
                                <button
                                  style="
                                  margin: 0 auto;
                                    background-color: #14b1ab;
                                    color: #fff;
                                    border-radius: 50px;
                                    height: 40px;
                                    width: 40%;
                                    border: none;
                                    margin: 20px auto 0 auto;
                                  "
                                >
                                  Verify email address
                                </button>
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20"></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td>
                        <h1
                          style="
                            font-family: 'Arial Black', Gadget, sans-serif;
                            color: #797979;
                            text-align: center;
                          "
                        >
                          Stay in touch
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4
                          style="
                            text-align: center;
                            color: #8d8d8d;
                            font-family: 'Arial Black', Gadget, sans-serif;
                          "
                        >
                          Email sent by Andrei Vasiloi
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4
                          style="
                            text-align: center;
                            color: #8d8d8d;
                            font-family: 'Arial Black', Gadget, sans-serif;
                          "
                        >
                          © Copyright 2020 Andrei Vasiloi
                        </h4>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        
        
        `,
      },
    });
}

export async function registerInFirebase(creds) {
  try {
    const confirmEmailCode = cuid();
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({ displayName: creds.displayName });
    sendConfirmEmail(creds.email, confirmEmailCode);
    result.user.confirmEmailCode = confirmEmailCode;
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(creds) {
  
  try {
    var auth = firebase.auth();
    var emailAddress = creds.email;
    auth.sendPasswordResetEmail(emailAddress)
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user, true);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deleteFromFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}
