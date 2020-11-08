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
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <title>Document</title>
          </head>
        
          <body style="background-color: #f3f3f3; padding: 1% 5%">
            <div style="width: 50%; margin: 0 auto">
              <div style="background-color: #006a71; text-align: center; padding: 5%">
                <img src="https://i.ibb.co/SXzSRSV/confirm-Email2.png" alt="Confirm" />
              </div>
              <div
                style="
                  text-align: center;
                  background-color: #fff;
                  margin-top: -35px;
                  padding: 5%;
                "
              >
                <h1
                  style="
                    font-family: 'Arial Black', Gadget, sans-serif;
                    color: #4c4c4c;
                    font-size: 50px;
                  "
                >
                  Email Confirmation
                </h1>
                <p style="margin: 0 auto; color: #8d8d8d; font-size: 30px">
                  Hey, you\`re almost ready to start enjoying Reverto.
                </p>
                <p style="margin: 0 auto; color: #8d8d8d; font-size: 30px">
                  Simply click the big turquoise button below to verify your email
                  address.
                </p>
                <a href="${confirmUrl}" target="_blank">
                  <button
                    style="
                      background-color: #14b1ab;
                      color: #fff;
                      border-radius: 50px;
                      height: 50px;
                      width: 200px;
                      border: none;
                      margin-top: 20px;
                    "
                  >
                    Verify email address
                  </button>
                </a>
              </div>
            </div>
            <h1
              style="font-family: 'Comic Sans MS', cursive, sans-serif; color: #797979; text-align: center;"
            >
              Stay in touch
            </h1>
            <h4 style='text-align: center; color: #8d8d8d;'>Email sent by Reverto</h4>
            <h4 style='text-align: center; color: #8d8d8d;'>© Copyright 2020 Reverto</h4>
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
  debugger;
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
