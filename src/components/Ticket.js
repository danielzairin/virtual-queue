import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import firebase, { db } from "../firebase";
import { NavLink } from "react-router-dom";

function Ticket() {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);

  // Function to get current time of day's greeting
  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

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
    <div className="container d-flex justify-content-center flex-column h-100">
      <div className="card shadow">
        {queuer.status !== "idle" && establishment !== null ? (
          <div className="card-header text-center text-light bg-primary">
            <h3>{establishment.name}</h3>
          </div>
        ) : null}
        <div className="card-body">
          {/* Queuer ID */}
          <p className="display-3 text-center">{queuer.id.slice(0, 4)}</p>
          <hr />

          {/* Queuer status */}
          {queuer.status !== "idle" && establishment !== null ? (
            <p className="text-center">
              {queuer.status === "denied" ? (
                <span className="text-danger"> Denied</span>
              ) : queuer.status === "allowed" ? (
                <span className="text-success"> Allowed</span>
              ) : null}
            </p>
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

          {/* Message if queuer is allowed */}
          {queuer.status === "allowed" ? (
            <div className="text-center">
              <p>You may now enter the establishment.</p>
              <p>
                Please present this ticket to the queue attendant when asked.
              </p>
            </div>
          ) : null}

          {/* Message if queuer is idle */}
          {queuer.status === "idle" ? (
            <div className="text-center">
              <p>You are not in any queue.</p>
              <NavLink to="/discover">Discover nearby queues</NavLink>
            </div>
          ) : null}

          {/* Message if queuer is queuieng */}
          {queuer.status === "queueing" && establishment !== null ? (
            <div className="text-center container">
              <p>Current position in queue:</p>
              <h2 className="text-center mb-3">
                {establishment.queuers.findIndex(
                  (element) => element === queuer.id
                ) + 1}
              </h2>
              <p className="text-center mb-3">
                out of {establishment.queuers.length}
              </p>
              <hr />
              <p>Good {getTimeOfDay()}, thank you for waiting.</p>
              <p>We'll notify you once you are allowed to enter.</p>
              <button
                className="btn btn-danger btn-block mb-3"
                onClick={abandon}
              >
                Abandon
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
