function ManageCard(props) {
  function allowEntry() {
    // 1. Set queuer's status to allowed
    // 2. Remove queuer from establishment's queue
  }

  function denyEntry() {
    // 1. Set queuer's status to denied
    // 2. Remove queuer from establishment's queue
  }

  return (
    <div>
      {/* Render queuer's ID */}
      <button onClick={allowEntry}>Allow entry</button>
      <button onClick={denyEntry}>Deny entry</button>
    </div>
  );
}

export default ManageCard;
