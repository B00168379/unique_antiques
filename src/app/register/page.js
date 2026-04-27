'use client';

export default function Page() {

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = data.get('email');
    const pass = data.get('pass');
    const dob = data.get('dob');
    const acctype = data.get('acctype');

    if (email == '' || pass == '' || dob == '') {
      alert("Please complete all fields");
      return;
    }

    fetch("/api/register?email=" + email 
      + "&pass=" + pass 
      + "&dob=" + dob 
      + "&acctype=" + acctype)
      .then((res) => res.json())
      .then(() => {
        alert("User registered");
        form.reset();
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
      <h2>Create A New Account</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

        <input name="email" placeholder="Email" />
        <br />

        <input name="pass" type="password" placeholder="Password" />
        <br />

        <input name="dob" placeholder="Date of Birth" />
        <br />

        <select name="acctype">
          <option value="">Role</option>
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
        </select>

        <button type="submit">
          Register
        </button>

      </form>

      {/* BOTÓN LOGIN */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => window.location.href = "/login"}>
          Login
        </button>
      </div>

    </div>
  );
}