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
  const itemsRef = db.collection("items");
  var sortBy = predicate.get("sort");
  return itemsRef.orderBy(sortBy);
}

export function listenToItemsFromFirestoreForExpirationDate() {
  return db.collection("items");
}

export function listenToItemFromFirestore(itemId) {
  return db.collection("items").doc(itemId);
}

export function addItemToFirestore(item) {
  const user = firebase.auth().currentUser;
  return db.collection("items").add({
    ...item,
    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
    userUid: user.uid,
    emailStatus: false,
    userEmail: user.email,
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
    .where("creationDate", ">=", predicate.get("firstDay"))
    .where("creationDate", "<=", predicate.get("lastDay"))
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
  const user = firebase.auth().currentUser;
  return db.collection("categories").add({
    ...category,
    value: { ...category }.text,
    userUid: user.uid,
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

  if(predicate !== undefined) {
    if (predicate.get("endDate")) {
      return appointmentsRef
        .where("date", ">=", predicate.get("startDate"))
        .where("date", "<=", predicate.get("endDate"));
    } else {
      return appointmentsRef.where("date", ">=", predicate.get("startDate"));
    }
  }else {
    return appointmentsRef;
  }
 
}

export function listenToAppointmentFromFirestore(appointmentId) {
  return db.collection("appointments").doc(appointmentId);
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

export function getAppointmentsByMonth(predicate) {
  let appointmentsRef = db.collection("appointments");
  return appointmentsRef
    .where("date", ">=", predicate.get("firstDate"))
    .where("date", "<=", predicate.get("secondDate"))
    .orderBy("date");
}

export function getAppointmentsByYear(predicate) {
  let appointmentsRef = db.collection("appointments");
  return appointmentsRef
    .where("date", ">=", predicate.get("firstDate"))
    .where("date", "<=", predicate.get("secondDate"))
    .orderBy("date");
}

export function getAppointmentsByCustomDates(predicate) {
  
  let appointmentsRef = db.collection("appointments");
  return appointmentsRef
    .where("date", ">=", predicate.get("firstDate"))
    .where("date", "<=", predicate.get("secondDate"))
    .orderBy("date");
}

//reasons

export function listenToReasonsFromFirestore() {
  return db.collection("reasons");
}

export function listenToReasonFromFirestore(reasonId) {
  return db.collection("reasons").doc(reasonId);
}

export function addReasonToFirestore(reason) {
  const user = firebase.auth().currentUser;
  return db.collection("reasons").add({
    ...reason,
    value: { ...reason }.text,
    userUid: user.uid,
  });
}

export function updateReasonInFirestore(reason) {
  return db.collection("reasons").doc(reason.id).update(reason);
}

export function deleteReasonInFirestore(reasonId) {
  return db.collection("reasons").doc(reasonId).delete();
}

//Clients

export function listenToClientsFromFirestore() {
  return db.collection("clients").orderBy("name");
}

export function listenToClientFromFirestore(clientId) {
  return db.collection("clients").doc(clientId);
}

export function addClientToFirestore(client) {
  const user = firebase.auth().currentUser;
  return db.collection("clients").add({
    ...client,
    userUid: user.uid,
  });
}

export function updateClientInFirestore(client) {
  return db.collection("clients").doc(client.id).update(client);
}

export function deleteClientInFirestore(clientId) {
  return db.collection("clients").doc(clientId).delete();
}

//Expenses

export function listenToExpensesFromFirestore(predicate) {
  const itemsRef = db.collection("expenses");
  var sortBy = predicate.get("sort");
  return itemsRef.orderBy(sortBy);
}

export function listenToExpenseFromFirestore(expenseId) {
  return db.collection("expenses").doc(expenseId);
}

export function addExpenseToFirestore(expense) {
  const user = firebase.auth().currentUser;
  return db.collection("expenses").add({
    ...expense,
    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
    userUid: user.uid,
  });
}

export function updateExpenseInFirestore(expense) {
  return db.collection("expenses").doc(expense.id).update(expense);
}

export function deleteExpenseInFirestore(expenseId) {
  return db.collection("expenses").doc(expenseId).delete();
}

export function getExpensesByMonth(predicate) {
  let itemsRef = db.collection("expenses");
  return itemsRef
    .where("purchaseDate", ">=", predicate.get("firstDate"))
    .where("purchaseDate", "<=", predicate.get("secondDate"))
    .orderBy("purchaseDate");
}

export function getExpensesByYear(predicate) {
  let itemsRef = db.collection("expenses");
  return itemsRef
    .where("purchaseDate", ">=", predicate.get("firstDate"))
    .where("purchaseDate", "<=", predicate.get("secondDate"))
    .orderBy("purchaseDate");
}

export function getExpensesByCustomDates(predicate) {
  let itemsRef = db.collection("expenses");
  return itemsRef
    .where("purchaseDate", ">=", predicate.get("firstDate"))
    .where("purchaseDate", "<=", predicate.get("secondDate"))
    .orderBy("purchaseDate");
}

//Profile

export function setUserProfileData(user, isSocialLogin = false) {
  const userProfile = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  if (isSocialLogin === false) {
    userProfile.hasConfirmedEmail = false;
    userProfile.confirmEmailCode = user.confirmEmailCode;
  }

  return db.collection("users").doc(user.uid).set(userProfile);
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

export function confirmEmail(email, code) {
  // get user by email & code
  return db
    .collection("users")
    .where("email", "==", email)
    .where("confirmEmailCode", "==", code)
    .get()
    .then((response) => {
      // parse response to get the users
      const users = response.docs.map((doc) => {
        const user = doc.data();
        return { ...user, id: doc.id };
      });

      // check if any user has the correct email & code
      if (users.length === 0) {
        return false; // return not success
      }

      // update user with confirm email = true
      return db
        .collection("users")
        .doc(users[0].id)
        .update({ hasConfirmedEmail: true, confirmEmailCode: "" })
        .then(() => {
          return true; // return success
        });
    });
}

