import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);

  const API = "https://heritage-backend-3-tv46.onrender.com";

  useEffect(() => {
    axios
      .get(`${API}/monuments/${id}`)
      .then((res) => setMonument(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!monument) {
    return (
      <h2 style={{ padding: "20px" }}>Loading monument details...</h2>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "20px",
            padding: "8px 15px",
            border: "none",
            background: "#333",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>

        {/* IMAGE HEADER */}
        <img
          src={monument.image_url}
          alt={monument.name}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x400?text=No+Image";
          }}
        />

        {/* DETAILS */}
        <div style={{ marginTop: "20px" }}>
          <h1>{monument.name}</h1>

          <h3 style={{ color: "gray" }}>
            📍 {monument.location}
          </h3>

          <p style={{ marginTop: "15px", fontSize: "18px" }}>
            {monument.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default Detail;