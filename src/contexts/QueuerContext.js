import { useEffect, createContext, useState } from "react";
import { db, messaging } from "../firebase";

export const QueuerContext = createContext();

export function QueuerContextProvider(props) {
  const [queuer, setQueuer] = useState(null);

  useEffect(() => {
    async function listen() {
      let queuerId = localStorage.getItem("queuerId");

      // If queuer ID is NOT in local storage
      if (queuerId === null) {
        // Create new queuer in database
        await db
          .collection("queuers")
          .add({
            status: "idle",
            queueingFor: null,
          })
          .then((docRef) => {
            // Store new queuer's ID in local storage
            localStorage.setItem("queuerId", docRef.id);
            queuerId = docRef.id;
          })
          .catch((error) => console.error(error));
      }

      // Get notification token
      const registration = await navigator.serviceWorker.getRegistration("/");

      messaging
        .getToken({
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })
        .then((currentToken) => {
          if (currentToken) {
            db.collection("tokens").doc(queuerId).set({
              token: currentToken,
            });
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
        });

      // Listen to changes in database
      return db
        .collection("queuers")
        .doc(queuerId)
        .onSnapshot((doc) => {
          setQueuer({ id: doc.id, ...doc.data() });
        });
    }

    const unsubscribe = listen();

    // Unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  return (
    <QueuerContext.Provider value={queuer}>
      {props.children}
    </QueuerContext.Provider>
  );
}

export default QueuerContextProvider;
