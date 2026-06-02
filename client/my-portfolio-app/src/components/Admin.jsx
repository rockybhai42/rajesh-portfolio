import { useState } from "react";

function Admin() {
  const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] =
  useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );
  const [contacts, setContacts] = useState([]);

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
            "adminLoggedIn",
            "true"
          );

          setIsLoggedIn(true);

          fetchContacts();
        } else {
        alert("Invalid Password");
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchContacts() {
    try {
      const response = await fetch(
        "https://portfolio-backend-uadl.onrender.com/contacts",
        {
          headers: {
            "admin-password": password
          }
        }
      );

      const data = await response.json();

      setContacts(data);

    } catch (error) {
      console.log(error);
    }
  }

    function handleLogout() {
      localStorage.removeItem(
        "adminLoggedIn"
      );

      setIsLoggedIn(false);
      setPassword("");
      setContacts([]);
    }

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Contact Messages</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;