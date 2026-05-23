import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await newRequest.post("/users/login", { email, password });
      

      localStorage.setItem("currentUser", JSON.stringify(res.data.user || res.data));
      localStorage.setItem("token", res.data.token || "login_success");
      
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid email or password!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div style={styles.brandTitle}>Fiverr<span style={{ color: "#1dbf73" }}>.</span></div>
        <p style={styles.brandText}>Welcome back! Log in to manage your gigs.</p>
      </div>
      <div style={styles.rightSide}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Sign In to Fiverr</h1>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder=" " onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh", width: "100vw", fontFamily: "sans-serif", backgroundColor: "#f7f9fa" },
  leftSide: { flex: "1", backgroundColor: "#0d1b2a", color: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px", backgroundImage: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" },
  brandTitle: { fontSize: "48px", fontWeight: "bold", marginBottom: "20px" },
  brandText: { fontSize: "18px", color: "#b0c4de", lineHeight: "1.6", maxWidth: "400px" },
  rightSide: { flex: "1.2", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" },
  form: { width: "100%", maxWidth: "450px" },
  heading: { fontSize: "28px", fontWeight: "700", color: "#333333", marginBottom: "30px" },
  inputGroup: { marginBottom: "20px", display: "flex", flexDirection: "column" },
  label: { fontSize: "14px", fontWeight: "600", color: "#444444", marginBottom: "8px" },
  input: { padding: "12px 16px", fontSize: "15px", border: "1px solid #dddddd", borderRadius: "6px", outline: "none", backgroundColor: "#fafafa" },
  button: { width: "100%", padding: "14px", backgroundColor: "#1dbf73", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "10px" }
};

export default Login;