import { useContext } from "react";
import { EstablishmentContext } from "../contexts/EstablishmentContext";
import { db, auth } from "../firebase";
import ManageCard from "./ManageCard";

function Manage() {
  const establishment = useContext(EstablishmentContext);

  function updateLocation() {
    // 1. Get current position
    navigator.geolocation.getCurrentPosition((position) => {
      // 1.1 Update current position to database
      db.collection("establishments").doc(establishment.id).update({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }

  function toggleOpen() {
    db.collection("establishments").doc(establishment.id).update({
      isOpen: !establishment.isOpen,
    });
  }

  async function signOut() {
    auth.signOut();
  }

  return (
    <div>
      <h2>Manage</h2>
      {/* Render establishment's data */}
      <h3>Establishment's data</h3>
      <p>Name: {establishment.name}</p>
      <p>Is open: {establishment.isOpen.toString()}</p>
      <p>Longitude: {establishment.longitude}</p>
      <p>Latitude: {establishment.latitude}</p>
      <p>Queue length: {establishment.queuers.length}</p>
      <button onClick={updateLocation}>Use current location</button>
      <button onClick={toggleOpen}>
        {establishment.isOpen ? "Close queue" : "Open queue"}
      </button>
      <button onClick={signOut}>Sign out</button>

      {/* Render LIST of queuers */}
      <h3>List of queuers</h3>
      <ol>
        {establishment.queuers.map((queuerId) => (
          <li key={queuerId}>
            <ManageCard
              queuerId={queuerId}
              establishmentId={establishment.id}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Manage;
