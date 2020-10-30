/* eslint-disable promise/always-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/catch-or-return */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const currentDay = new Date();

function sendConfirmEmail(email, name) {
  return db.collection("mail").add({
    to: email,
    message: {
      subject: "expired items",
      text: `${name} is expired `,
    },
  });
}

exports.sendWarningEmail = functions.pubsub
  .schedule("every day 11:27")
  .timeZone("Europe/Bucharest")
  .onRun(async () => {
    itemsRef = db.collection("items");
    var query = itemsRef.where("expirationDate", "<", currentDay);
    return query
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const email = String(doc.data().userEmail);
          const name = String(doc.data().name);
          const docName = String(doc.id);
          const emailStatus = doc.data().emailStatus;
          if (!emailStatus) {
            sendConfirmEmail(email, name);
            db.collection("items").doc(docName).update({ emailStatus: true });
          }
        });
      })
      .catch((error) => {
        return console.log("Error getting documents: ", error);
      });
  });

exports.clearOlderEmails = functions.pubsub
  .schedule("every saturday 15:16")
  .timeZone("Europe/Bucharest")
  .onRun(async () => {
    mailRef = db.collection("mail");
    return mailRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const docName = String(doc.id);
          const endTime = doc.data().delivery.endTime.toDate();
          if (endTime < currentDay) {
            db.collection("mail").doc(docName).delete();
          }
        });
      })
      .catch((error) => {
        return console.log("Error getting documents: ", error);
      });
  });
