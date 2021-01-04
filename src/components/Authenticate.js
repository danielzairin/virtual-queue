import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function Authenticate() {
  const [signUpInstead, setSignUpInstead] = useState(false);

  return (
    <div className="container d-flex justify-content-center flex-column h-100">
      <div className="card">
        <div className="card-body shadow">
          {signUpInstead ? <SignUp /> : <SignIn />}
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-secondary btn-block"
            onClick={() => setSignUpInstead((prev) => !prev)}
          >
            {signUpInstead ? "I already have an account" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
