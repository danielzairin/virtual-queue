import { useEffect, createContext, useState } from "react";
import { db } from "../firebase";

export const QueuerContext = createContext();

export function QueuerContextProvider(props) {
  const [queuer, setQueuer] = useState(null);

  useEffect(() => {
    async function listen() {
      let queuerId = localStorage.getItem("queuerId");

      // 1. If queuer ID is NOT in local storage
      if (queuerId === null) {
        // 1.1 Create new queuer in database
        await db
          .collection("queuers")
          .add({
            status: "idle",
            queueingFor: null,
          })
          .then((docRef) => {
            // 1.2 Store new queuer's ID in local storage
            localStorage.setItem("queuerId", docRef.id);
          })
          .catch((error) => console.error(error));
      }

      // 2. Listen to changes in database
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
