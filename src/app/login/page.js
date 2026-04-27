//app/login
'use client';
// import router to redirect users after login
import { useRouter } from 'next/navigation';

export default function Page() {
   
 // create router object 
  const router = useRouter();

  // function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

     // get form data
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const pass = data.get('pass');

       // validation
    if (email == '' || pass == '') {
      alert("Please enter both email and password");
      return;
    }

       // call login API
    fetch("/api/login?email=" + email + "&pass=" + pass)
      .then((res) => res.json())
      .then((data) => {

        if (data.data == "true") {

          localStorage.setItem("email", email);
          localStorage.setItem("acctype", data.acctype);

          // redirect based on account type, manager access.
          if (data.acctype == "manager") {
            router.push("/managerview");
          } else {
            router.push("/dashboard");
          }

        } else {
          alert("Invalid login");
        }

      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>

      {/* Title */}
      <h1>UNIQUE ANTIQUES</h1>

      {/* LOGO */}
      <div style={{
        width: "250px",
        height: "150px",
        margin: "20px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img 
          src="/logo.png" 
          alt="logo"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>

      {/* Subtitle */}
      <h2>User Login</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

        <input name="email" placeholder="Email" />
        <br />

        <input name="pass" type="password" placeholder="Password" />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {/*  link to register  page*/}
      <div style={{ marginTop: "20px" }}>
        <a href="/register">Don't have an account? Register here!</a>
      </div>

    </div>
  );
}