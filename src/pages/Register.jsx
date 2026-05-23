import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {

    const res = await newRequest.post("/users", {
      name: username,          
      email: email,            
      password_hash: password, 
      role: isSeller ? "seller" : "buyer" 
    });

    alert("User registered successfully! 🎉");
    navigate("/login");
  } catch (err) {
    console.error("backend error :", err.response?.data);
    const errorMessage = err.response?.data?.message || err.response?.data?.error || JSON.stringify(err.response?.data);
    alert("Backend Says: " + (errorMessage || "Error occurred!"));
  }
};
 

  return (
    <div style={styles.container}>
     
      <div style={styles.leftSide}>
        <div style={styles.brandTitle}>Fiverr<span style={{ color: "#1dbf73" }}>.</span></div>
        <p style={styles.brandText}>Join our community of expert freelancers and secure your next big gig today.</p>
      </div>
    
      <div style={styles.rightSide}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Create A New Account</h1>
          <p style={styles.subHeading}>It takes less than a minute</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input type="text" placeholder=" " onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="" onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="text" placeholder="+20 12345" onChange={(e) => setPhone(e.target.value)} required style={styles.input} />
          </div>

          <div style={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              id="isSeller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)} 
              style={styles.checkbox}
            />
            <label htmlFor="isSeller" style={styles.checkboxLabel}>Activate the Seller Account</label>
          </div>

          <button type="submit" style={styles.button}>Register</button>
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
  heading: { fontSize: "28px", fontWeight: "700", color: "#333333", marginBottom: "5px" },
  subHeading: { fontSize: "14px", color: "#777777", marginBottom: "30px" },
  inputGroup: { marginBottom: "18px", display: "flex", flexDirection: "column" },
  label: { fontSize: "14px", fontWeight: "600", color: "#444444", marginBottom: "8px" },
  input: { padding: "12px 16px", fontSize: "15px", border: "1px solid #dddddd", borderRadius: "6px", outline: "none", backgroundColor: "#fafafa" },
  checkboxGroup: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px", marginTop: "10px" },
  checkbox: { width: "18px", height: "18px", cursor: "pointer", accentColor: "#1dbf73" },
  checkboxLabel: { fontSize: "14px", fontWeight: "600", color: "#444444", cursor: "pointer" },
  button: { width: "100%", padding: "14px", backgroundColor: "#1dbf73", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }
};

export default Register;
