import { useEffect, createContext, useState } from "react";
import { db } from "../firebase";

export const EstablishmentContext = createContext();

function EstablishmentContextProvider(props) {
  const [establishment, setEstablishment] = useState();

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user !== null) setEstablishment(user);
    // });

    // TEMPORARY TEST DATA
    const unsubscribe = db
      .collection("establishments")
      .doc("YxSVX0naBfW4AaPhgdF4rGfFVK03")
      .onSnapshot((doc) => {
        setEstablishment({ id: doc.id, ...doc.data() });
      });

    return () => unsubscribe();
  }, []);

  return (
    <EstablishmentContext.Provider value={establishment}>
      {props.children}
    </EstablishmentContext.Provider>
  );
}

export default EstablishmentContextProvider;
