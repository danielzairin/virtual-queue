import { useEffect, useState } from "react";
import Map from "./Map";

function Discover() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords);
        setPermissionGranted(true);
        setLoading(false);
      },
      () => {
        setPermissionGranted(false);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="w-100 h-100">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center flex-column h-100">
          <div className="spinner-border m-3"></div>
          <p className="font-italic">Getting current location</p>
        </div>
      ) : permissionGranted ? (
        <Map
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      ) : (
        <div className="container d-flex justify-content-center flex-column h-100 text-center">
          <p className="font-italic">Please enable location services</p>
        </div>
      )}
    </div>
  );
}

export default Discover;
