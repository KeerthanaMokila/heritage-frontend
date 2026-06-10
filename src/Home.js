import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [monuments, setMonuments] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const API = "https://heritage-backend-3-tv46.onrender.com";

  // FETCH DATA
  const fetchData = () => {
    axios
      .get(`${API}/monuments`)
      .then((res) => setMonuments(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE
  const deleteMonument = (id) => {
    axios
      .delete(`${API}/monuments/${id}`)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>🏛️ HeritageAR</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search monument..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "20px",
          }}
        />

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {monuments
            .filter((m) =>
              m.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((m) => (
              <div
                key={m.id}
                onClick={() => navigate(`/monument/${m.id}`)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "15px",
                  cursor: "pointer",
                  background: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h2>{m.name}</h2>
                <p>{m.location}</p>

                <img
                  src={m.image_url}
                  alt={m.name}
                  width="100%"
                  height="180"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMonument(m.id);
                  }}
                  style={{
                    marginTop: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;