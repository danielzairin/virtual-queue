import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import firebase, { db } from "../firebase";
import { NavLink } from "react-router-dom";

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

  return (
    <div>
      <div className="card">
        <div className="card-body">
          {/* Queuer ID */}
          <p className="display-3 text-center">{queuer.id.slice(0, 4)}</p>
          <hr />

          {/* Queuer status */}
          {queuer.status !== "idle" && establishment !== null ? (
            <p className="text-center">
              {establishment.name} -
              {queuer.status === "denied" ? (
                <span className="text-danger"> Denied</span>
              ) : queuer.status === "allowed" ? (
                <span className="text-success"> Allowed</span>
              ) : queuer.status === "queueing" ? (
                <span> Queueing</span>
              ) : null}
            </p>
          ) : null}

          {/* Message if queuer is queueing */}
          {queuer.status === "queueing" && establishment !== null ? (
            <div>
              <p className="text-center">
                Position{" "}
                {establishment.queuers.findIndex(
                  (element) => element === queuer.id
                ) + 1}{" "}
                out of {establishment.queuers.length}
              </p>
              <button className="btn btn-danger btn-block" onClick={abandon}>
                Abandon
              </button>
            </div>
          ) : null}

          {/* Message if queuer is allowed */}
          {queuer.status === "allowed" ? (
            <div className="text-center">
              <p>You may now enter the establishment.</p>
              <p>Please show this ticket to the queue attendant when asked.</p>
            </div>
          ) : null}

          {/* Message if queuer is denied */}
          {queuer.status === "denied" ? (
            <div className="text-center">
              <p>Sorry, your entry was denied by the establishment.</p>
              <NavLink to="/discover">
                Queue for a different establishment
              </NavLink>
            </div>
          ) : null}

          {/* Message if queuer is idle */}
          {queuer.status === "idle" ? (
            <div className="text-center">
              <p>You are not in any queue.</p>
              <NavLink to="/discover">Discover nearby queues</NavLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
