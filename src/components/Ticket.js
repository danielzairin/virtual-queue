import { useEffect, useContext, useState } from "react";
import { QueuerContext } from "../contexts/QueuerContext";
import firebase, { db } from "../firebase";
import { NavLink } from "react-router-dom";

function Ticket() {
  const queuer = useContext(QueuerContext);
  const [establishment, setEstablishment] = useState(null);

  {/*Function to get current time*/}
  const date = new Date()
  const hours = date.getHours()
  let timeOfDay
        
  if (hours < 12) {
    timeOfDay = "morning"
  } else if (hours >= 12 && hours < 17) {
     timeOfDay = "afternoon"
  } else {
     timeOfDay = "night"
  }
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

  return (
    <div>
      <div className="card">
        <div className="card-header text-center bg-primary text-white text-capitalize">
        {queuer.status === "idle"? (
          <h3>Establishment</h3>
        ) : establishment !== null ? (
          <h3>{establishment.name}</h3>
          ) : null}
          </div>
        <div className="card-body">
          {/* Queuer ID */}
          <p className="display-3 text-center">{queuer.id.slice(0, 4)}</p>
          <hr />

          {/* Queuer status */}
          {queuer.status !== "idle" && establishment !== null ? (
            <p className="text-center">
              {queuer.status === "denied" ? (
                <span className="text-danger"> Denied</span>
              ) : queuer.status === "allowed" ? (
                <span className="text-success"> Allowed</span>
              ) : queuer.status === "queueing" ? (
                <span> Queueing</span>
              ) : null}
            </p>
          ) : null}

          {/* Message if queuer is allowed */}
          {queuer.status === "allowed" ? (
            <div className="text-center">
              <p>You may enter now.</p>
              <p>🌕🌕🌕</p>
              <h4>Thank you for your consideration</h4>
            </div>
          ) : null}

            {/* Message if queuer is denied */}
            {queuer.status === "denied" ? (
            <div className="text-center">
              <p>Sorry, your entry was denied by the establishment.</p>
              <p>🌕🌕🌕</p>
              <NavLink to="/discover">
                Queue for a different establishment
              </NavLink>
            </div>
          ) : null}

          {/* Message if queuer is idle */}
          {queuer.status === "idle" ? (
            <div className="text-center">
              <p>You are not in any queue.</p>
              <p>🌕🌕🌕</p>
              <NavLink to="/discover">Discover nearby queues</NavLink>
            </div>
          ) : null}

          {/* Message if queuer is queuieng */}
          {queuer.status === "queueing" && establishment !== null ? (
            <div className="text-center container">
              <h4>Good {timeOfDay} sir, <br /> Thank you for waiting.</h4>
              <p>🌕🌕🌕</p>
              <p>Here's is your position in the queue</p>

              <div className="container">              
              <h2 className="text-center mb-3" > 
                {establishment.queuers.findIndex((element) => element === queuer.id) + 1}
              </h2>
              <p className="text-center mb-3"> 
                out of {establishment.queuers.length}
              </p>
              </div>
              <p>We'll notify you when your turn</p>
              <p>Press the button to cancel the queue</p>
              <button className="btn btn-danger btn-block mb-3" onClick={abandon}>Abandon</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
      
  );


  {/*
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
      

      {/* Render ticket for queuer's status *
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
    </div>
      );*/}



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
      )}*/}

          
}

export default Ticket;
