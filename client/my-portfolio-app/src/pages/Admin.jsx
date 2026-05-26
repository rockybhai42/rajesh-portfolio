import { useEffect, useState } from "react";

function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminPassword = localStorage.getItem("adminPassword");

    if (!adminPassword) {
      alert("Please login first");
      window.location.href = "/admin-login";
      return;
    }

    fetch(
      "https://portfolio-backend-uadl.onrender.com/contacts",
      {
        headers: {
          "admin-password": adminPassword
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        localStorage.removeItem("adminPassword");

        alert("Session expired");

        window.location.href = "/admin-login";
      });

  }, []);

  function handleLogout() {
    localStorage.removeItem("adminPassword");
    window.location.href = "/admin-login";
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Contact Messages</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      <table border="1" cellPadding="10">
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