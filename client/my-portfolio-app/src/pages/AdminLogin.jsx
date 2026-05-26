import { useState } from "react";

function AdminLogin() {
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://portfolio-backend-uadl.onrender.com/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "adminPassword",
          password
        );

        window.location.href = "/admin";
      } else {
        alert("Invalid Password");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;