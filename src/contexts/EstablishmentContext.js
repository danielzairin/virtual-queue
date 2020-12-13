import { useEffect, createContext, useState } from "react";
import { db, auth } from "../firebase";

export const EstablishmentContext = createContext();

function EstablishmentContextProvider(props) {
  const [establishment, setEstablishment] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Temporary function for possible snapshot unsubscriber
      let unsubscribe = () => {};

      // Add database listener if user is signed in
      if (user !== null) {
        unsubscribe = db
          .collection("establishments")
          .doc(user.uid)
          .onSnapshot((doc) => {
            setEstablishment({ id: doc.id, ...doc.data() });
          });
      } else {
        setEstablishment(null);
        // Unsubscribe from database listener
        unsubscribe();
      }
    });

    // Unsubscribe from authentication listener
    return () => unsubscribe();
  }, []);

  return (
    <EstablishmentContext.Provider value={establishment}>
      {props.children}
    </EstablishmentContext.Provider>
  );
}

export default EstablishmentContextProvider;
