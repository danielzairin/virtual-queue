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
      <button className="btn btn-secondary mb-3">Sign in</button>
    </form>
  );
}

export default SignIn;
