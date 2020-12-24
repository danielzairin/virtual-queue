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
      <h2 className="text-center mb-3">Queues Nearby</h2>

      {/* Render LIST of discover cards*/}
      <ol className="list-group">
        {establishments.map((establishment) => (
          <li key={establishment.id} className="list-group-item">
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
