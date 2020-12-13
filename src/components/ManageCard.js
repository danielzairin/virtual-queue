import firebase from "firebase/app";
import { db } from "../firebase";

function ManageCard(props) {
  function allowEntry() {
    // 1. Set queuer's status to allowed
    db.collection("queuers").doc(props.queuerId).update({
      status: "allowed",
    });

    // 2. Remove queuer from establishment's queue
    db.collection("establishments")
      .doc(props.establishmentId)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(props.queuerId),
      });
  }

  function denyEntry() {
    // 1. Set queuer's status to denied
    db.collection("queuers").doc(props.queuerId).update({
      status: "denied",
    });

    // 2. Remove queuer from establishment's queue
    db.collection("establishments")
      .doc(props.establishmentId)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(props.queuerId),
      });
  }
  return (
    <div>
      {/* Render queuer's ID */}
      <p>{props.queuerId}</p>
      <button onClick={allowEntry}>Allow entry</button>
      <button onClick={denyEntry}>Deny entry</button>
    </div>
  );
}

export default ManageCard;
