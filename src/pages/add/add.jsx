import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [cat, setCat] = useState("design");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/gigs", {
        title,
        description: desc,
        category: cat,
        status: "active",
        price: Number(price),
        cover: cover
      }, { withCredentials: true });
     // alert("Gig Created Successfully! 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create gig.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Add New Gig</h1>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
        <select onChange={(e) => setCat(e.target.value)} style={styles.input}>
          <option value="design">Design</option>
          <option value="development">Development</option>
        </select>
        <textarea placeholder="Description" onChange={(e) => setDesc(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Cover Image URL" onChange={(e) => setCover(e.target.value)} required style={styles.input} />
        <button type="submit" style={styles.button}>Create Gig</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "600px", margin: "0 auto" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px" },
  button: { padding: "15px", backgroundColor: "#1dbf73", color: "#fff", border: "none", cursor: "pointer" }
};

export default Add;