import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Discover from "./components/Discover";
import Ticket from "./components/Ticket";
import Manage from "./components/Manage";
import { QueuerContext } from "./contexts/QueuerContext";
import { useContext } from "react";
import { EstablishmentContext } from "./contexts/EstablishmentContext";

function App() {
  const queuer = useContext(QueuerContext);
  const establishment = useContext(EstablishmentContext);

  return (
    <div>
      {queuer === null && establishment === null ? (
        <p>Connecting to database...</p>
      ) : (
        <div>
          {/* Header */}
          <h1>PogQueue</h1>

          {/* Routes */}
          <Switch>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/ticket">
              <Ticket />
            </Route>
            <Route path="/manage">
              <Manage />
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
