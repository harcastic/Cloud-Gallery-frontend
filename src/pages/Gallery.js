import { useEffect, useState } from "react";
import { request } from "../api";
import Navbar from "../components/Navbar";

export default function Gallery({ setPage }) {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [view, setView] = useState("gallery");
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);

  const fetchImages = async () => {
    try {
      const data = await request("/images");
      setImages(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await request("/auth/profile");
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchProfile();
  }, []);

  const uploadImage = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await request("/images", "POST", formData, true);
      setFile(null);
      setView("gallery");
      fetchImages();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteImage = async (id) => {
    try {
      await request(`/images/${id}`, "DELETE");
      fetchImages();
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div>
      <Navbar setView={setView} logout={logout} user={user} />

      <div style={styles.container}>
        {/* Upload */}
        {view === "upload" && (
          <div style={styles.card} className="glass">
            <h2>Upload Image</h2>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={uploadImage}>Upload</button>
          </div>
        )}

        {/* Gallery */}
        {view === "gallery" && (
          <div style={styles.grid}>
            {images.map((img) => (
              <div key={img._id} style={styles.imageCard} className="glass">
                <img
                  src={img.url}
                  alt={img.filename || "Gallery image"}
                  style={styles.image}
                  onClick={() => setSelectedImage(img.url)}
                />
                <button onClick={() => deleteImage(img._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          style={styles.modal}
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Full screen image view" style={styles.fullImage} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 30
  },
  card: {
    padding: 30,
    width: 320,
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20,
    width: "85%"
  },
  imageCard: {
    padding: 10,
    borderRadius: 16,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 10,
    cursor: "pointer"
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: 16
  }
};