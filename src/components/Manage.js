import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { db, auth } from "../firebase";
import ManageCard from "./ManageCard";

function Manage() {
  const { user, isSignedIn } = useContext(AuthContext);
  const [establishment, setEstablishment] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      return db
        .collection("establishments")
        .doc(user.uid)
        .onSnapshot((doc) => {
          setEstablishment({ id: doc.id, ...doc.data() });
        });
    }
  }, [user, isSignedIn]);

  function toggleOpen() {
    if (establishment.isOpen === true) {
      db.collection("establishments").doc(establishment.id).update({
        isOpen: false,
      });
    } else {
      // Get current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update current position to database
          db.collection("establishments").doc(establishment.id).update({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            isOpen: true,
          });

          // Make sure the error message is hidden
          document.querySelector("#error-message").innerHTML = "";
        },
        () => {
          document.querySelector("#error-message").innerHTML =
            "Please enable location services to open the queue.";
        }
      );
    }
  }

  async function signOut() {
    auth.signOut();
  }

  return (
    <div className="text-center">
      {isSignedIn && establishment ? (
        <div>
          {/* Render establishment's data */}
          <h1 className="m-3">{establishment.name} </h1>
          <button
            className={
              establishment.isOpen ? "btn btn-danger" : "btn btn-success"
            }
            onClick={toggleOpen}
          >
            {establishment.isOpen ? "Close queue" : "Open queue"}
          </button>
          <button className="btn btn-secondary ml-2" onClick={signOut}>
            Sign out
          </button>
          <p className="text-danger m-3" id="error-message"></p>
          <hr />

          {/* Render LIST of queuers */}
          {establishment.queuers.length > 0 ? (
            <div>
              <h3 className="mb-3">List of queuers</h3>
              <ul className="list-group">
                {establishment.queuers.map((queuerId) => (
                  <li className="list-group-item shadow mb-3" key={queuerId}>
                    <ManageCard
                      queuerId={queuerId}
                      establishmentId={establishment.id}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {establishment.queuers.length === 0 && establishment.isOpen ? (
            <p className="font-italic">Waiting for queuers...</p>
          ) : null}

          {establishment.queuers.length === 0 && !establishment.isOpen ? (
            <p className="font-italic">Open the queue to be discoverable</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Manage;
