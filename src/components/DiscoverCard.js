import { useContext } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import { useHistory } from "react-router-dom";
import firebase, { db } from "../firebase";

function DiscoverCard(props) {
  const queuer = useContext(QueuerContext);
  const history = useHistory();

  function enqueue() {
    // 1. Proceed if queuer is not queueing
    if (queuer.status !== "queueing" && !props.outOfRange) {
      // 2. Add queuer to establishment's queue
      db.collection("establishments")
        .doc(props.id)
        .update({
          queuers: firebase.firestore.FieldValue.arrayUnion(queuer.id),
        });

      // 3. Set queuer's status to queueing
      // 4. Set queuer's queueingFor to props.id
      db.collection("queuers").doc(queuer.id).update({
        status: "queueing",
        queueingFor: props.id,
      });

      // 5. Redirect to /ticket
      history.push("/ticket");
    } else {
      alert(
        "You are already in a queue. Please abandon if you want to queue for a different establishment."
      );
    }

    // NOTE: Establishment's ID for this discover card is stored in props.id
  }

  return (
    <div>
      <h5 className="text-capitalize">{props.name}</h5>
      {props.queueLength > 0 ? (
        <p>
          {props.queueLength} {props.queueLength === 1 ? "person" : "people"} in
          queue
        </p>
      ) : (
        <p>Nobody in queue</p>
      )}

      {props.outOfRange ? (
        <p className="text-danger">Out of range</p>
      ) : queuer.status === "queueing" ? (
        <p className="text-danger">Already in a queue</p>
      ) : null}

      <button
        disabled={queuer.status === "queueing" || props.outOfRange}
        onClick={enqueue}
        className="btn btn-primary btn-block"
      >
        Enqueue
      </button>
    </div>
  );
}

export default DiscoverCard;
