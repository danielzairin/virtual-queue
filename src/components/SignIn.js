import { auth } from "../firebase";

function SignIn() {
  function signIn(event) {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      document.querySelector("#error-message").innerHTML = error.message;
    });
  }

  return (
    <form onSubmit={signIn}>
      <input
        className="form-control mb-3"
        type="email"
        name="email"
        placeholder="E-mail..."
        required
        autoComplete="off"
      />
      <input
        className="form-control mb-3"
        type="password"
        name="password"
        placeholder="Password..."
        required
      />
      <p className="text-danger text-center" id="error-message"></p>
      <button className="btn btn-primary btn-block mb-3">Sign in</button>
    </form>
  );
}

export default SignIn;
