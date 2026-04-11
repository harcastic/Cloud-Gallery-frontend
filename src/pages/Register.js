import { useState } from "react";
import { request } from "../api";

export default function Register({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      await request("/auth/register", "POST", form);

      alert("Registered successfully");
      setPage("login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleRegister}>Register</button>

      <p
        onClick={() => setPage("login")}
        style={styles.link}
      >
        Already have an account?
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
    margin: "100px auto",
    background: "white",
    padding: 20,
    borderRadius: 10
  },
  link: {
    cursor: "pointer",
    color: "blue"
  }
};