import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function Authenticate() {
  const [signUpInstead, setSignUpInstead] = useState(false);

  return (
    <div>
      {signUpInstead ? <SignUp /> : <SignIn />}
      <p
        style={{ cursor: "pointer" }}
        className="text-info text-center"
        onClick={() => setSignUpInstead((prev) => !prev)}
      >
        {signUpInstead ? "I already have an account" : "Create an account"}
      </p>
    </div>
  );
}

export default Authenticate;
