import { useState } from "react";
import { request } from "../api";

export default function Login({ setPage }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      const data = await request("/auth/login", "POST", form);

      localStorage.setItem("token", data.token);

      setPage("gallery");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => setPage("register")} style={styles.link}>
        Create account
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