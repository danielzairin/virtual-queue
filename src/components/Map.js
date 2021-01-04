import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { db } from "../firebase";
import DiscoverCard from "./DiscoverCard";

function Map(props) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 17,
  });
  const [establishments, setEstablishments] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  useEffect(() => {
    // Get establishments from database that are open
    db.collection("establishments")
      .where("isOpen", "==", true)
      .get()
      .then((docs) => {
        let establishments = [];

        docs.forEach((doc) => {
          establishments.push({
            id: doc.id,
            ...doc.data(),
            outOfRange: !(
              props.latitude >= doc.data().latitude - 0.003 &&
              props.latitude <= doc.data().latitude + 0.003 &&
              props.longitude >= doc.data().longitude - 0.003 &&
              props.longitude <= doc.data().longitude + 0.003
            ),
          });
        });

        // setEstablishments
        setEstablishments(establishments);
      });
  }, [props]);

  return (
    <div className="h-100 w-100">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <Marker latitude={props.latitude} longitude={props.longitude}>
          <p>❌ You are here</p>
        </Marker>

        {establishments.length &&
          establishments.map((establishment) => (
            <Marker
              key={establishment.id}
              latitude={establishment.latitude}
              longitude={establishment.longitude}
            >
              <p onClick={() => setSelectedEstablishment(establishment)}>🏢</p>
            </Marker>
          ))}

        {selectedEstablishment ? (
          <Popup
            latitude={selectedEstablishment.latitude}
            longitude={selectedEstablishment.longitude}
            onClose={() => {
              setSelectedEstablishment(null);
            }}
            closeOnClick={false}
          >
            <DiscoverCard
              name={selectedEstablishment.name}
              id={selectedEstablishment.id}
              queueLength={selectedEstablishment.queuers.length}
              outOfRange={selectedEstablishment.outOfRange}
            />
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
