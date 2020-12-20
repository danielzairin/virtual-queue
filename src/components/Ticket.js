import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import { db } from "../firebase";
import { NavLink } from "react-router-dom";
import firebase from "firebase";

function Ticket() {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);

  function abandon() {
    db.collection("queuers").doc(queuer.id).update({
      status: "idle",
      queueingFor: "",
    });

    db.collection("establishments")
      .doc(queuer.queueingFor)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(queuer.id),
      });
  }

  useEffect(() => {
    let unsubscribe = () => {};

    // 1. If queuer's status is NOT idle
    if (queuer.status !== "idle") {
      // 1.1 Listen to the establishment the queuer is queueing for
      unsubscribe = db
        .collection("establishments")
        .doc(queuer.queueingFor)
        .onSnapshot((doc) => {
          setEstablishment(doc.data());
        });
    } else {
      setEstablishment(null);
    }

    return () => unsubscribe();
  }, [queuer]);

  // Statuses
  // 1. idle
  // 2. queueing
  // 3. allowed
  // 4. denied

  return (
    <div >
      <h2>Ticket</h2>
      <p>Queuer ID: {queuer.id}</p>
      <p>Status: {queuer.status}</p>
      <p>Queueing for: {establishment !== null ? establishment.name : null}</p>
      {establishment !== null ? (
        <p>
          Queue position:{" "}
          {establishment.queuers.findIndex((element) => element === queuer.id) +
            1}{" "}
          of {establishment.queuers.length}
        </p>
      ) : null}

      {/* Rennder ticket if queuer's status is queueing */}
      {queuer.status === "queueing" ? (
        <p>...........Queueing.............</p>
      ) : queuer.status === "allowed" ? (
        <p>You may now enter now </p>
      ) : queuer.status === "denied" ? (
        <p>
          Your queue had been denied. Please enter queue again
          <NavLink to="/discover">Discover</NavLink>
        </p>
      ) : (
        <p>
          You Need to Queue
          <NavLink to="/discover">Discover</NavLink>
        </p>
      )}

      {queuer.status !== "idle" ? (
        <button onClick={abandon}>Abandon</button>
      ) : null}

      {/* Render allowed message if queuer's status is allowed */}

      {/* Render allowed message if queuer's status is denied */}

      {/* Render not in queue message if queuer's status is idle */}

      {/*    */}
    </div>
  );
}

export default Ticket;
