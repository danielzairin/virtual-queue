import { auth, db } from "../firebase";

function SignUp() {
  function signUp(event) {
    event.preventDefault();
    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    // 1. Sign up user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        // 2. Create new establishment in database
        db.collection("establishments")
          .doc(cred.user.uid)
          .set({
            name: name,
            isOpen: false,
            longitude: null,
            latitude: null,
            queuers: [],
          })
          .catch(console.error);
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={signUp}>
      <input
        type="text"
        name="name"
        placeholder="Establishment name..."
        required
      />
      <input type="email" name="email" placeholder="E-mail..." required />
      <input
        type="password"
        name="password"
        placeholder="Password..."
        required
      />
      <button>Sign up</button>
    </form>
  );
}

export default SignUp;
