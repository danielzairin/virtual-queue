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
          .catch((error) => {
            document.querySelector("#error-message").innerHTML = error.message;
          });
      })
      .catch((error) => {
        document.querySelector("#error-message").innerHTML = error.message;
      });
  }

  return (
    <form onSubmit={signUp}>
      <input
        className="form-control mb-3"
        type="text"
        name="name"
        placeholder="Establishment name..."
        required
        autoComplete="off"
      />
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
      <button className="btn btn-primary btn-block mb-3">Sign up</button>
    </form>
  );
}

export default SignUp;
