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
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Email Template</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0; padding: 0;background-color: #f3f3f3">
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="700"
            style="border-collapse: collapse"
          >
            <tr>
              <td align="center" bgcolor="#ffda77" style="padding: 20px 0 20px 0">
                <img
                  src="https://i.ibb.co/zQpckCM/expired-5251000-1920.png"
                  alt="Creating Email Magic."
                  width="200"
                  height="140"
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
                          font-size: 2.5vw;
                        "
                      >
                      Expired Item
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0 30px 0">
                      <p style="margin: 0; color: #8d8d8d; font-size: 1.5vw; text-align: center;">
                          We just want to inform you that your product ${name} has expired.
                      </p>
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
                        margin: 0 auto;
                      "
                    >
                      Have a nice day!
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
                        margin: 0 auto;
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
                        margin: 0 auto;
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
