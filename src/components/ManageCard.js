import firebase, { db, functions } from "../firebase";

function ManageCard(props) {
  function allowEntry() {
    // Set queuer's status to allowed
    db.collection("queuers").doc(props.queuerId).update({
      status: "allowed",
    });

    // Remove queuer from establishment's queue
    db.collection("establishments")
      .doc(props.establishmentId)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(props.queuerId),
      });

    // Send push notification
    const sendNotification = functions.httpsCallable("sendNotification");

    sendNotification({
      queuerId: props.queuerId,
      notification: {
        title: "PogQueue Status",
        body: "You may now enter the establishment.",
      },
    }).catch((err) => console.log(err));
  }

  function denyEntry() {
    // Set queuer's status to denied
    db.collection("queuers").doc(props.queuerId).update({
      status: "denied",
    });

    // Remove queuer from establishment's queue
    db.collection("establishments")
      .doc(props.establishmentId)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(props.queuerId),
      });

    // Send push notification
    const sendNotification = functions.httpsCallable("sendNotification");

    sendNotification({
      queuerId: props.queuerId,
      notification: {
        title: "PogQueue Status",
        body: "Sorry, your entry was denied by the establishment.",
      },
    }).catch((err) => console.log(err));
  }

  return (
    <div className="text-left d-flex flex-row align-items-center">
      {/* Render queuer's ID */}
      <h4 className="m-0">{props.queuerId.slice(0, 4)}</h4>
      <button className="btn btn-success ml-auto" onClick={allowEntry}>
        Allow
      </button>
      <button className="btn btn-danger ml-2" onClick={denyEntry}>
        Deny
      </button>
    </div>
  );
}

export default ManageCard;
