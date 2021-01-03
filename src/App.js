import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Discover from "./components/Discover";
import Ticket from "./components/Ticket";
import Manage from "./components/Manage";
import { QueuerContext } from "./contexts/QueuerContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Authenticate from "./components/Authenticate";

function App() {
  const queuer = useContext(QueuerContext);
  const { isSignedIn } = useContext(AuthContext);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <div
      className="container d-flex align-items-center"
      style={{ height: `${windowHeight - 55}px` }}
    >
      {queuer === null ? (
        // Loading spinner
        <div className="d-flex align-items-center flex-column w-100">
          <div className="spinner-border m-3"></div>
          <p>Connecting to database...</p>
        </div>
      ) : (
        <div className="container">
          {/* Routes */}
          <Switch>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/ticket">
              <Ticket />
            </Route>
            <Route path="/manage">
              {isSignedIn ? <Manage /> : <Authenticate />}
            </Route>
            <Redirect to="/discover" />
          </Switch>

          {/* Navigation */}
          <Navbar />
        </div>
      )}
    </div>
  );
}

export default App;
