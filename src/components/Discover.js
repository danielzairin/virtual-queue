import { useEffect, useState } from "react";
import DiscoverCard from "./DiscoverCard";
import { db } from "../firebase";

function Discover() {
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    // 1. Get current location

    // 2. Get establishments from database
    db.collection("establishments")
      .where("isOpen", "==", true)
      .get()
      .then((docs) => {
        const data = [];

        docs.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        // 3. setEstablishments
        setEstablishments(data);
      });
  }, []);

  return (
    <div>
      <h2>Discover nearby queues</h2>

      {/* Render LIST of discover cards*/}
      <ol>
        {establishments.map((establishment) => (
          <li>
            <DiscoverCard
              name={establishment.name}
              id={establishment.id}
              queueLength={establishment.queuers.length}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Discover;
