const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotification = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .collection("tokens")
    .doc(data.queuerId)
    .get()
    .then((doc) => {
      const token = doc.data().token;

      const payload = {
        notification: {
          ...data.notification,
        },
      };

      return admin.messaging().sendToDevice(token, payload);
    });
});
