import { useEffect, useContext } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
// import { db } from "../firebase";

function Ticket() {
  const queuer = useContext(QueuerContext);
  // const [establishment, setEstablishment] = useState();

  useEffect(() => {
    // 1. If queuer's status is NOT idle
    // 1.1 Listen to the establishment the queuer is queueing for
  }, []);

  return (
    <div>
      <h2>Ticket</h2>
      <p>Queuer ID: {queuer.id}</p>
      <p>Status: {queuer.status}</p>
      <p>Queueing for: {queuer.queueingFor}</p>
      {/* Render ticket if queuer's status is queueing */}
      {/* Render allowed message if queuer's status is allowed */}
      {/* Render allowed message if queuer's status is denied */}
      {/* Render not in queue message if queuer's status is idle */}
    </div>
  );
}

export default Ticket;
