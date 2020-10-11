import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  };
}

//items

export function listenToItemsFromFirestore(predicate) {
  const user = firebase.auth().currentUser.uid;
  const itemsRef = db.collection("items");
  var sortBy = predicate.get("sort");
  return itemsRef.orderBy(sortBy);
}

export function listenToItemFromFirestore(itemId) {
  return db.collection("items").doc(itemId);
}

export function addItemToFirestore(item) {
  
  return db.collection("items").add({
    ...item,
    creationDate: firebase.firestore.FieldValue.serverTimestamp()
  });
}

export function updateItemInFirestore(item) {
  return db.collection("items").doc(item.id).update(item);
}

export function deleteItemInFirestore(itemId) {
  return db.collection("items").doc(itemId).delete();
}

export function getItemsNumberInMonth(predicate) {
  
  let itemsRef = db.collection("items");
  return itemsRef
    .where("creationDate", ">=", predicate.get('firstDay'))
    .where("creationDate", "<=", predicate.get('lastDay'))
    .orderBy("creationDate");
}


//categories

export function listenToCategoriesFromFirestore() {
  return db.collection("categories").orderBy("text");
}

export function listenToCategoryFromFirestore(categoryId) {
  return db.collection("categories").doc(categoryId);
}

export function addCategoryToFirestore(category) {
  return db.collection("categories").add({
    ...category,
    value: { ...category }.text,
  });
}

export function updateCategoryInFirestore(category) {
  return db.collection("categories").doc(category.id).update(category);
}

export function deleteCategoryInFirestore(categoryId) {
  return db.collection("categories").doc(categoryId).delete();
}

//appointments

export function listenToAppointmentsFromFirestore(predicate) {
  let appointmentsRef = db.collection("appointments").orderBy("date");
  if (typeof predicate === "object") {
    return appointmentsRef.where("date", ">=", predicate.get("startDate"));
  } else {
    return appointmentsRef;
  }
}

export function addAppointmentToFirestore(appointment) {
  const user = firebase.auth().currentUser;
  return db.collection("appointments").add({
    ...appointment,
    userUid: user.uid,
  });
}

export function updateAppointmentInFirestore(appointment) {
  return db.collection("appointments").doc(appointment.id).update(appointment);
}

export function deleteAppointmentInFirestore(appointmentId) {
  return db.collection("appointments").doc(appointmentId).delete();
}

export function getAppointmentsNumberInMonth(predicate) {
  let appointmentsRef = db.collection("appointments");
  return appointmentsRef
    .where("date", ">=", predicate.get('firstDay'))
    .where("date", "<=", predicate.get('lastDay'))
    .orderBy("date");
}

//reasons

export function listenToReasonsFromFirestore() {
  return db.collection("reasons");
}

export function addReasonToFirestore(reason) {
  return db.collection("reasons").add({
    ...reason,
    value: { ...reason }.text,
  });
}

export function updateReasonInFirestore(reason) {
  return db.collection("reasons").doc(reason.id).update(reason);
}

export function deleteReasonInFirestore(reasonId) {
  return db.collection("reasons").doc(reasonId).delete();
}

export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

