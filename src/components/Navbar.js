export default function Navbar({ setView, logout, user }) {
  return (
    <div style={styles.nav} className="glass">
      
      {/* Left */}
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>✨ Cloud Gallery</h2>
      </div>

      {/* Center */}
      <div style={styles.center}>
        <button onClick={() => setView("gallery")}>View</button>
        <button onClick={() => setView("upload")}>Upload</button>
      </div>

      {/* Right (Profile) */}
      <div style={styles.right}>
        <div style={styles.profile}>
          <span style={styles.avatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "👤"}
          </span>

          <span style={styles.username}>
            {user?.name || "User"}
          </span>

          <button onClick={logout}>Logout</button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "15px 30px",
    margin: 20,
    borderRadius: 16
  },

  left: {
    justifySelf: "start"
  },

  center: {
    display: "flex",
    gap: 15,
    justifyContent: "center"
  },

  right: {
    justifySelf: "end"
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  avatar: {
    fontSize: 18,
    background: "rgba(255,255,255,0.2)",
    padding: "6px 10px",
    borderRadius: "50%"
  },

  username: {
    fontWeight: "500"
  }
};