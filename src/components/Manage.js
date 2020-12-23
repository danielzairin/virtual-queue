import { useContext } from "react";
import { EstablishmentContext } from "../contexts/EstablishmentContext";
import { db, auth } from "../firebase";
import ManageCard from "./ManageCard";

function Manage() {
  const establishment = useContext(EstablishmentContext);

  function toggleOpen() {
    if (establishment.isOpen === true) {
      db.collection("establishments").doc(establishment.id).update({
        isOpen: false,
      });
    } else {
      // 1. Get current position
      navigator.geolocation.getCurrentPosition((position) => {
        // 1.1 Update current position to database
        db.collection("establishments").doc(establishment.id).update({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          isOpen: true,
        });
      });
    }
  }

  async function signOut() {
    auth.signOut();
  }

  return (
    <div className="text-center">
      {/* Render establishment's data */}
      <h1>{establishment.name} </h1>
      <p>
        {establishment.latitude}, {establishment.longitude}
      </p>
      <button
        className={establishment.isOpen ? "btn btn-danger" : "btn btn-success"}
        onClick={toggleOpen}
      >
        {establishment.isOpen ? "Close queue" : "Open queue"}
      </button>
      <button className="btn btn-secondary ml-2" onClick={signOut}>
        Sign out
      </button>
      <hr />

      {/* Render LIST of queuers */}
      {establishment.isOpen === true ? (
        <div>
          <h3 className="mb-3">List of queuers</h3>
          <ul className="list-group">
            {establishment.queuers.map((queuerId) => (
              <li className="list-group-item" key={queuerId}>
                <ManageCard
                  queuerId={queuerId}
                  establishmentId={establishment.id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Manage;
