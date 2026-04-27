'use client';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const pass = data.get('pass');

    if (email == '' || pass == '') {
      alert("Please enter both email and password");
      return;
    }

    fetch("/api/login?email=" + email + "&pass=" + pass)
      .then((res) => res.json())
      .then((data) => {

        if (data.data == "true") {

          localStorage.setItem("email", email);
          localStorage.setItem("acctype", data.acctype);

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

      {/* Título */}
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

      {/* Subtítulo */}
      <h2>User Login</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

        <input name="email" placeholder="Email" />
        <br />

        <input name="pass" type="password" placeholder="Password" />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {/* Registro */}
      <div style={{ marginTop: "20px" }}>
        <a href="/register">Don't have an account? Register here!</a>
      </div>

    </div>
  );
}