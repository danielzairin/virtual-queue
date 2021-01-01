import { useContext, useEffect, useState } from "react";
import DiscoverCard from "./DiscoverCard";
import { db } from "../firebase";
import { QueuerContext } from "../contexts/QueuerContext";

function Discover() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const queuer = useContext(QueuerContext);

  useEffect(() => {
    setLoading(true);

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        setPermissionGranted(true);

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
      },
      () => {
        setPermissionGranted(false);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <h2 className="text-center mb-3">Queues Nearby</h2>
      {queuer.status === "queueing" ? (
        <p className="text-center font-italic">
          You can only queue for one establishment at a time.
        </p>
      ) : null}
      <hr />

      {establishments.length > 0 && !loading ? (
        <ol className="list-group">
          {establishments.map((establishment) => (
            <li key={establishment.id} className="list-group-item shadow mb-3">
              <DiscoverCard
                name={establishment.name}
                id={establishment.id}
                queueLength={establishment.queuers.length}
              />
            </li>
          ))}
        </ol>
      ) : loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-3"></div>
        </div>
      ) : permissionGranted && establishments.length === 0 && !loading ? (
        <p className="text-center">There are no queues near you.</p>
      ) : !permissionGranted && !loading ? (
        <p className="text-center">Please enable location services.</p>
      ) : null}
    </div>
  );
}

export default Discover;
