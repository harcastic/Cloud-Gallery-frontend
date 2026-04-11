import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";

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