import { useState, useEffect } from "react";
import Login from "../../frontend/src/pages/Login";
import Register from "../../frontend/src/pages/Register";
import Gallery from "../../frontend/src/pages/Gallery";

function App() {
  const [page, setPage] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("gallery");
  }, []);

  return (
    <div>
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "gallery" && <Gallery setPage={setPage} />}
    </div>
  );
}

export default App;