import { auth } from "../firebase";

function SignIn() {
  function signIn(event) {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    auth.signInWithEmailAndPassword(email, password).catch(console.error);
  }

  return (
    <form onSubmit={signIn}>
      <input
        className="form-control mb-3"
        type="email"
        name="email"
        placeholder="E-mail..."
        required
      />
      <input
        className="form-control mb-3"
        type="password"
        name="password"
        placeholder="Password..."
        required
      />
<<<<<<< HEAD
      <button className="w3-button w3-theme-d2 w3-round-large">Sign in</button>
=======
      <button className="btn btn-secondary btn-block mb-3">Sign in</button>
>>>>>>> 208d9aa847888e6b7689963ac53ed6a805673347
    </form>
  );
}

export default SignIn;
