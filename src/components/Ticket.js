import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import { db } from "../firebase";

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
      {/* Render ticket if queuer's status is queueing */}

      {/* Render allowed message if queuer's status is allowed */}

      {queuer.status === "allowed" ? (
        <p>You may now enter</p>
      ) : (
        <p>You shall not pass</p>
      )}

      {/* Render allowed message if queuer's status is denied */}

      {/* Render not in queue message if queuer's status is idle */}
    </div>
  );
}

export default Ticket;
