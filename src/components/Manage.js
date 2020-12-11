import { useEffect, useContext } from "react";
import { EstablishmentContext } from "../contexts/EstablishmentContext";

function Manage() {
  const establishment = useContext(EstablishmentContext);

  useEffect(() => {
    // 1. If user is not signed in, redirect to sign in page
  }, []);

  async function signOut() {
    // firebase.auth().signOut();
  }

  return (
    <div>
      <h2>Manage</h2>
      {/* Render establishment's data */}
      <p>Name: {establishment.name}</p>
      <p>Is open: {establishment.isOpen.toString()}</p>
      <p>Longitude: {establishment.longitude}</p>
      <p>Latitude: {establishment.latitude}</p>
      <p>Queue length: {establishment.queuers.length}</p>

      {/* Render LIST of queuers */}
      <ol>
        {establishment.queuers.map((queuer) => (
          <li>{queuer}</li>
        ))}
      </ol>

      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Manage;
