import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function Authenticate() {
  const [signUpInstead, setSignUpInstead] = useState(false);

  return (
    <div>
      {signUpInstead ? <SignUp /> : <SignIn />}
      <button onClick={() => setSignUpInstead((prev) => !prev)}>
        {signUpInstead ? "I already have an account" : "Create an account"}
      </button>
    </div>
  );
}

export default Authenticate;