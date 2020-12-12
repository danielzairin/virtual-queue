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
      <input type="email" name="email" placeholder="E-mail..." required />
      <input
        type="password"
        name="password"
        placeholder="Password..."
        required
      />
      <button>Sign in</button>
    </form>
  );
}

export default SignIn;
