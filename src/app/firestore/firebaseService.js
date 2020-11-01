import { toast } from "react-toastify";
import cuid from 'cuid';
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
  const confirmUrl = `http://localhost:3000/confirmEmail/${email}/${confirmEmailCode}`;

  return firebase.firestore()
  .collection("mail")
  .add({
    to: email,
    message: {
      subject: "Confirm email - registration on ManagementApp",
      text: `Thank you for registering on our app! Please confirm you email by clicking on this url ${confirmUrl}`,
      html: `Thank you for registering on our app! Please confirm you email by clicking on this <a href="${confirmUrl}"> CONFIRM EMAIL </a>`,
    },
  })
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
    if (selectedProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
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
      debugger
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