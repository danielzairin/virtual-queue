import { useEffect, createContext, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      // Temporary function for possible snapshot unsubscriber
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        setUser(null);
      }

      console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
