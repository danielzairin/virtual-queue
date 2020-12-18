import Discover from "./Discover";
import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import { db } from "../firebase";

function DiscoverCard(props) {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);
  
  function enqueue() {
    // 1. Proceed if queuer's status is idle
    {queuer.status === "idle" ? (
      <p>hi</p>


    ) : <p>kk</p> }
    // 2. Add queuer to establishment's queue
    // 3. Set queuer's status to queueing
    // 4. Set queuer's queueingFor to props.id
    // NOTE: Establishment's ID for this discover card is stored in props.id
  }

  return (
    <div>
      <p>Establishment name: {props.name}</p>
      <p>Queue length: {props.queueLength}</p>
      <button onClick={enqueue}>Enqueue</button>
    </div>
  );
}

export default DiscoverCard;
