import { useContext, useEffect, useState } from "react";
import DiscoverCard from "./DiscoverCard";
import { db } from "../firebase";
import { QueuerContext } from "../contexts/QueuerContext";

function Discover() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const queuer = useContext(QueuerContext);

  useEffect(() => {
    setLoading(true);

    // Get current location
    navigator.geolocation.getCurrentPosition((loc) => {
      const { latitude, longitude } = loc.coords;

      // Get establishments from database that are open
      db.collection("establishments")
        .where("isOpen", "==", true)
        .get()
        .then((docs) => {
          let establishments = [];

          docs.forEach((doc) => {
            establishments.push({ id: doc.id, ...doc.data() });
          });

          // Filter based on current location
          establishments = establishments.filter((establishment) => {
            return (
              latitude >= establishment.latitude - 0.003 &&
              latitude <= establishment.latitude + 0.003 &&
              longitude >= establishment.longitude - 0.003 &&
              longitude <= establishment.longitude + 0.003
            );
          });

          // setEstablishments
          setEstablishments(establishments);
          setLoading(false);
        });
    });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-3">Queues Nearby</h2>
      {queuer.status === "queueing" ? (
        <p className="text-center font-italic">
          You can only queue for one establishment at a time.
        </p>
      ) : null}

      {establishments.length && !loading > 0 ? (
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
      ) : loading ? (
        <p className="text-center">Scanning...</p>
      ) : (
        <p className="text-center">There are no queues near you.</p>
      )}
    </div>
  );
}

export default Discover;
