import { useState, useEffect } from "react";
import "../styles/admin.css";
import { API_BASE_URL } from "../config/api";

function Admin() {
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     AUTO LOGIN
  ========================= */

  useEffect(() => {
    if (token) {
      fetchContacts(token);
    }
  }, []);

  /* =========================
     LOGIN
  ========================= */

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);

        setToken(data.token);
        setIsLoggedIn(true);
        setPassword("");

        fetchContacts(data.token);
      } else {
        alert(data.message || "Invalid Password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* =========================
     FETCH CONTACTS
  ========================= */

  async function fetchContacts(authToken = token) {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     DELETE MESSAGE
  ========================= */

  async function deleteMessage(id) {
    const confirmDelete = window.confirm("Delete this message?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (data.success) {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* =========================
     LOGOUT
  ========================= */

  function handleLogout() {
    localStorage.removeItem("adminToken");

    setToken(null);
    setIsLoggedIn(false);
    setPassword("");
    setContacts([]);
  }

  /* =========================
     SEARCH
  ========================= */

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* =========================
     LOGIN SCREEN
  ========================= */

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>Admin Login</h1>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  /* =========================
     ADMIN PANEL
  ========================= */

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Contact Messages</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-card">
        <h3>Total Messages</h3>
        <p>{contacts.length}</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No messages found
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>

                  <td>{contact.email}</td>

                  <td className="message-cell">{contact.message}</td>

                  <td>{new Date(contact.create_at).toLocaleString()}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMessage(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
