import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios"; 
import newRequest from "./utils/newRequest"; 
import GigCard from "./components/GigCard"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Add from "./pages/add/add";
import GigDetails from "./pages/GigDetails";


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const Home = () => {
  const [gigs, setGigs] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const hasToken = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await newRequest.get("/gigs");
        if (Array.isArray(res.data)) {
          setGigs(res.data);
        } else if (res.data && Array.isArray(res.data.gigs)) {
          setGigs(res.data.gigs);
        } else {
          setGigs([]); 
        }
      } catch (err) {
        setError("Something went wrong while fetching gigs.");
        console.error(err);
      }
    };
    fetchGigs();
  }, []);

  return (
    <div style={styles.homeContainer}>
      
      <div style={styles.heroSection}>
        <h2 style={styles.heroTitle}>Find the perfect freelance services for your business</h2>
        <p style={styles.heroSubtitle}>Browse top-rated services created by our talented community.</p>
      </div>

      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Featured Gigs</h3>
        
        {/* seller */}
        {hasToken && currentUser?.role === "seller" && (
          <button onClick={() => navigate("/add")} style={styles.addBtn}>
            + Add New Gig
          </button>
        )}
      </div>

      {error && <p style={styles.errorText}>{error}</p>}
      
      
      <div style={styles.gridContainer}>
        {Array.isArray(gigs) && gigs.length > 0 ? (
          gigs.map((gig) => <GigCard key={gig._id || gig.id} item={gig} />)
        ) : (
          <p style={styles.noDataText}>No gigs found</p>
        )}
      </div>
    </div>
  );
};

const Layout = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const hasToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
    window.location.reload();
  };

  return (
    <div style={{ fontFamily: "'Macan', 'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#f7f7f7", minHeight: "100vh" }}>

      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <h1 onClick={() => navigate("/")} style={styles.logo}>fiverr<span style={{ color: "#1dbf73" }}>.</span></h1>
          
          <div style={styles.navLinks}>
            <span onClick={() => navigate("/")} style={styles.navLinkItem}>Explore</span>
            
            {hasToken && currentUser ? (
              <>
                <span style={styles.welcomeUser}>Hi, {currentUser.name } </span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <span onClick={() => navigate("/login")} style={styles.navLinkItem}>Sign In</span>
                <button onClick={() => navigate("/register")} style={styles.joinBtn}>Join</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <Outlet /> 
      </main>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/add", element: <Add /> },
      { path: "/gig/:id", element: <GigDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// css
const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e4e5e7",
    padding: "15px 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#404145",
    letterSpacing: "-1px",
    cursor: "pointer",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  navLinkItem: {
    color: "#62646a",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  welcomeUser: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#404145",
    backgroundColor: "#f1f1f1",
    padding: "6px 12px",
    borderRadius: "20px",
  },
  joinBtn: {
    border: "1px solid #1dbf73",
    color: "#1dbf73",
    background: "none",
    padding: "8px 20px",
    borderRadius: "4px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.2s",
  },
  logoutBtn: {
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
  },
  mainContent: {
    maxWidth: "1300px",
    margin: "30px auto",
    padding: "0 20px",
  },
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  heroSection: {
    backgroundColor: "#0d1b2a",
    backgroundImage: "radial-gradient(circle at top right, #1dbf73, #0d1b2a)",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  heroTitle: {
    fontSize: "32px",
    margin: "0 0 10px 0",
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: "16px",
    margin: 0,
    opacity: 0.8,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #e4e5e7",
    paddingBottom: "10px",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#404145",
    margin: 0,
    fontWeight: "700",
  },
  addBtn: {
    backgroundColor: "#1dbf73",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    boxShadow: "0 2px 8px rgba(29, 191, 115, 0.3)",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },
  errorText: {
    color: "#ff4d4f",
    fontWeight: "600",
  },
  noDataText: {
    color: "#7a7d85",
    fontSize: "16px",
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px 0",
  },
};

export default App;