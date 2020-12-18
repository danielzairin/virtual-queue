import { useEffect } from "react";
import DiscoverCard from "./DiscoverCard";
// import DiscoverCard from "./DiscoverCard";
// import { db } from "../firebase";

function Discover() {
  // const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    // 1. Get current location
    // 2. Get establishments within current location from database
    // 3. setEstablishments
  }, []);

  return (
    <div>
      <h2>Discover nearby queues</h2>
      <DiscoverCard />
      {/* Render LIST of discover cards*/}
    </div>
  );
}

export default Discover;
