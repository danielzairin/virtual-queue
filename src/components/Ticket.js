import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import firebase, { db } from "../firebase";
import { NavLink } from "react-router-dom";

function Ticket() {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);

  function abandon() {
    db.collection("queuers").doc(queuer.id).update({
      status: "idle",
      queueingFor: "",
    });

    db.collection("establishments")
      .doc(queuer.queueingFor)
      .update({
        queuers: firebase.firestore.FieldValue.arrayRemove(queuer.id),
      });
  }

  useEffect(() => {
    let unsubscribe = () => {};

    // 1. If queuer's status is NOT idle
    if (queuer.status !== "idle") {
      // 1.1 Listen to the establishment the queuer is queueing for
      unsubscribe = db
        .collection("establishments")
        .doc(queuer.queueingFor)
        .onSnapshot((doc) => {
          setEstablishment(doc.data());
        });
    } else {
      setEstablishment(null);
    }

    return () => unsubscribe();
  }, [queuer]);


  // Statuses
  // 1. idle
  // 2. queueing
  // 3. allowed
  // 4. denied

  return (
    <div >
      
      <div  class="container p-3 my-3 border center mb-3 rounded-lg ">
      
      {establishment !== null ? (
      <div>
        <h2 className="text-center mb-3">
          Position
        </h2>
        <div className="rounded-circle bg-primary mx-auto ">
        <h3 className="text-center mb-3" > 
          {establishment.queuers.findIndex((element) => element === queuer.id) +
            1}
        </h3>
        <p className="text-center mb-3"> 
          out of {establishment.queuers.length}
        </p>
        </div>
       </div> 
      ) : null}

      <p className="text-center mb-3">🌝 {queuer.id}</p>
      <p className="text-center mb-3">🧾 
        {queuer.status === "idle" ? (<span> Idle</span>) : 
          queuer.status === "denied" ? (<span> Denied</span>) :
          queuer.status === "allowed" ? (<span> Allowed</span>) :
          queuer.status === "queueing" ? (<span> In Queue</span>): null
        }
      </p>
      <p className="text-center mb-3">📍 {establishment !== null ? establishment.name : null}</p>
      

      {/* Render ticket for queuer's status */}
      {queuer.status === "queueing" ? (
        <p className="text-center mb-3">Queueing</p>
      ) : queuer.status === "allowed" ? (
        <p className="text-center mb-3">You may now enter now </p>
      ) : queuer.status === "denied" ? (
        <p>
          Your queue had been denied. Please abandon the queue.
          <br />
          
        </p>
      ) : (
        <p>
          You Need to Queue
          <br />
          <br />
          <NavLink to="/discover">Discover</NavLink>
        </p>
      )}

      {queuer.status !== "idle" ? (
        <button className="btn btn-primary btn-block mb-3" onClick={abandon}>Abandon</button>
      ) : null}

      </div>
    </div>
  );



    {/*just in case for backup*/}
        

    {/*<div >
      <h2  className="text-center mb-3">Ticket</h2>
      <div  class="container p-3 my-3 border center mb-3 rounded-lg ">
      <p>Queuer ID: {queuer.id}</p>
      <p>Status: 
        {queuer.status === "idle" ? (<span> Idle</span>) : 
          queuer.status === "denied" ? (<span> Denied</span>) :
          queuer.status === "allowed" ? (<span> Allowed</span>) :
          queuer.status === "queueing" ? (<span> In Queue</span>): null
        }
      </p>
      <p>Queueing for: {establishment !== null ? establishment.name : null}</p>
      {establishment !== null ? (
        <p>
          Queue position:{" "}
          {establishment.queuers.findIndex((element) => element === queuer.id) +
            1}{" "}
          of {establishment.queuers.length}
        </p>
      ) : null}

      {/* Render ticket for queuer's status *}
      {queuer.status === "queueing" ? (
        <p className="text-center mb-3">...........Queueing.............</p>
      ) : queuer.status === "allowed" ? (
        <p className="text-center mb-3">You may now enter now </p>
      ) : queuer.status === "denied" ? (
        <p>
          Your queue had been denied. Please abandon the queue.
          <br />
          <br />
          
        </p>
      ) : (
        <p>
          You Need to Queue
          <br />
          <br />
          <NavLink to="/discover">Discover</NavLink>
        </p>
      )}

      {queuer.status !== "idle" ? (
        <button className="btn btn-primary btn-block mb-3" onClick={abandon}>Abandon</button>
      ) : null}

      </div>
    </div>
      
  );  */}
}

export default Ticket;
