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
        queuers: db.FieldValue.arrayRemove(props.queuerId),
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
        queuers: db.FieldValue.arrayRemove(props.queuerId),
      });
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
