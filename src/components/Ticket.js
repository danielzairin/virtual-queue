import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import { db } from "../firebase";
import Discover from "./Discover";

function Ticket() {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);

  useEffect(() => {
    // 1. If queuer's status is NOT idle
    if (queuer.status !== "idle") {
      // 1.1 Listen to the establishment the queuer is queueing for
      db.collection("establishments")
        .doc(queuer.queueingFor)
        .onSnapshot((doc) => {
          setEstablishment(doc.data());
        });
    }
  }, []);

  // Statuses
  // 1. idle
  // 2. queueing
  // 3. allowed
  // 4. denied

  return (
    <div>
      <h2>Ticket</h2>
      <p>Queuer ID: {queuer.id}</p>
      <p>Status: {queuer.status}</p>
      <p>Queueing for: {queuer.queueingFor}</p>
      
      {/* Rennder ticket if queuer's status is queueing */}
      {queuer.status === "idle" ? (
        <p>...........Queueing.............</p>
      ) : 
      queuer.status === "allowed" ? (
        <p>You may now enter now </p>
      ) :
      queuer.status === "denied" ? (
        <p>Your queue had been denied. Please enter queue again 
        <button >Discover</button>
        </p>
      ) :
      (
      <p>You Need to Queue
        <button >Discover</button>
      </p>
      )} 


      {/* Render allowed message if queuer's status is allowed */}

      {/* Render allowed message if queuer's status is denied */}
      
      {/* Render not in queue message if queuer's status is idle */}

      
      {/*<button >Go to</button>*/}
    </div>
  );
}

export default Ticket;
