import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Discover from "./components/Discover";
import Ticket from "./components/Ticket";
import Manage from "./components/Manage";
import { QueuerContext } from "./contexts/QueuerContext";
import { useContext } from "react";
import { EstablishmentContext } from "./contexts/EstablishmentContext";
import Authenticate from "./components/Authenticate";

function App() {
  const queuer = useContext(QueuerContext);
  const establishment = useContext(EstablishmentContext);

  return (
    <div>
      <div className="bg-warning fixed-top p-2 text-center">
        <i>Remember to push and pull from GitHub!</i>
      </div>
      {queuer === null ? (
        <div className="spinner-border text-secondary">
          {/*<p>Connecting to database...</p>*/}
        </div>
      ) : (
        <div className="pt-5 " >
          {/* Routes */}
          <Switch>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/ticket">
              <Ticket />
            </Route>
            <Route path="/manage">
              {establishment === null ? <Authenticate /> : <Manage />}
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
