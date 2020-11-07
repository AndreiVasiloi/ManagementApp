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
      
        <body style="background-color: #f3f3f3; padding: 5%">
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
                Reverto notification
              </h1>
              <p style="margin: 0 auto; color: #8d8d8d; font-size: 30px">
                Hey, we want to let you know that your ${name} has <span style='color:red'>expired</span>.
              </p>
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
      `
    },
  });
}

exports.sendWarningEmail = functions.pubsub
  .schedule("every day 12:00")
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
  .schedule("every monday 12:00")
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
