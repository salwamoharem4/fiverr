import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);


  const [sellerName, setSellerName] = useState("Freelancer");
  const [sellerEmail, setSellerEmail] = useState("info.support@fiverr.com");
  const [cleanDescription, setCleanDescription] = useState("");

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        setLoading(true);
        
     
        const res = await axios.get("http://localhost:3000/api/gigs");
        const allGigs = Array.isArray(res.data) ? res.data : res.data.gigs || [];
        

        const singleGig = allGigs.find((g) => String(g.id || g._id) === String(id));

        if (singleGig) {
          setGig(singleGig);

          
          const finalName = singleGig.seller?.name || singleGig.username ;
          

          const finalEmail = singleGig.seller?.email || singleGig.sellerEmail ;

          setSellerName(finalName);
          setSellerEmail(finalEmail);

        
          const rawDescription = singleGig.description || "";
          const cleanedDesc = rawDescription
            .replace(/\[ContactEmail:\s*[^\]]+\]/g, "")
            .replace(/\[ContactName:\s*[^\]]+\]/g, "")
            .replace(/---SellerEmail:[^---]+---/g, "")
            .replace(/---SellerName:[^---]+---/g, "")
            .trim();
          
          setCleanDescription(cleanedDesc || rawDescription);

        } else {
          setError("Gig not found in the list!");
        }
      } catch (err) {
        console.error("Error fetching gig details:", err);
        setError("Failed to load gig details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGigData();
  }, [id]);

  if (loading) return <div style={styles.center}>Loading gig details... 🚀</div>;
  if (error) return <div style={{ ...styles.center, color: "#ff4d4f" }}>{error}</div>;
  if (!gig) return <div style={styles.center}>No gig found!</div>;

  
  // const avatarLetter = sellerName && typeof sellerName === "string" && sellerName.length > 0 
  //   ? sellerName.charAt(0).toUpperCase() 
  //   : "F";

  return (
    <div style={styles.container}>
     
      <div style={styles.leftContent}>
        <span style={styles.categoryBadge}>{gig.category }</span>
        <h1 style={styles.title}>{gig.title}</h1>
        
{/*        
        <div style={styles.sellerInfo}>
          {<div style={styles.avatar}>{avatarLetter}</div>}
          <div>
            <span style={styles.sellerName}>{sellerName}</span>
            <span style={styles.sellerEmail}>{sellerEmail}</span>
          </div>
        </div> */}

       
        <div style={styles.imageWrapper}>
          <img 
            src={gig.cover } 
            alt={gig.title} 
            style={styles.image}
          />
        </div>

        <h3 style={styles.sectionHeading}>About This Gig</h3>
        <p style={styles.description}>{cleanDescription}</p>
      </div>


      <div style={styles.rightSidebar}>
        <div style={styles.priceBox}>
          <div style={styles.priceHeader}>
            <span style={styles.priceLabel}>Standard Package</span>
            <span style={styles.priceValue}>${gig.price || "5"}</span>
          </div>
          <p style={styles.priceDesc}>Basic features included. Professional delivery on time.</p>
          
          <button onClick={() => setShowEmailModal(true)} style={styles.orderBtn}>
            Order Now (${gig.price || "5"})
          </button>
          
          <button onClick={() => navigate("/")} style={styles.backBtn}>
            ⬅️ Back to Explore
          </button>
        </div>
      </div>

      
      {showEmailModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ color: "#1dbf73", margin: "0 0 15px 0" }}>Order Initiated! 🎉</h2>
            <p style={{ color: "#404145", fontSize: "15px", lineHeight: "1.5" }}>
              To complete your order for <strong>"{gig.title}"</strong>, you can contact the seller directly via email:
            </p>
            
            <div style={styles.emailCard}>
              <p style={{ margin: "5px 0" }}><strong>Seller Name:</strong> {gig.seller?.name || "Freelancer"}</p>
              <p style={{ margin: "5px 0" }}><strong>Seller Email:</strong> <span style={{ color: "#1dbf73", fontWeight: "bold" }}>{gig.seller?.email || "N/A"}</span></p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${sellerEmail}&su=${encodeURIComponent("Fiverr Order: " + gig.title)}`} 
                target="_blank" 
                rel="noreferrer"
                style={styles.gmailBtn}
              >
                Open in Gmail ✉️
              </a>
              <button onClick={() => setShowEmailModal(false)} style={styles.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: { display: "flex", gap: "50px", maxWidth: "1300px", margin: "0 auto", padding: "20px", flexWrap: "wrap" },
  leftContent: { flex: 2, minWidth: "300px" },
  rightSidebar: { flex: 1, minWidth: "300px" },
  center: { textAlign: "center", padding: "100px 20px", fontSize: "18px", fontWeight: "600", color: "#62646a" },
  categoryBadge: { color: "#1dbf73", textTransform: "uppercase", fontSize: "13px", fontWeight: "700" },
  title: { fontSize: "32px", color: "#404145", margin: "10px 0 20px 0", fontWeight: "700", textTransform: "capitalize" },
  sellerInfo: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" },
  avatar: { width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#1dbf73", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px" },
  sellerName: { display: "block", fontWeight: "600", color: "#404145" },
  sellerEmail: { fontSize: "13px", color: "#7a7d85" },
  imageWrapper: { width: "100%", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", marginBottom: "30px" },
  image: { width: "100%", maxHeight: "450px", objectFit: "cover", display: "block" },
  sectionHeading: { fontSize: "20px", color: "#404145", marginBottom: "15px", fontWeight: "700" },
  description: { fontSize: "16px", color: "#62646a", lineHeight: "1.6", whiteSpace: "pre-line" },
  priceBox: { backgroundColor: "#ffffff", border: "1px solid #e4e5e7", padding: "30px", borderRadius: "4px", position: "sticky", top: "100px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
  priceHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  priceLabel: { fontSize: "16px", fontWeight: "600", color: "#404145" },
  priceValue: { fontSize: "26px", fontWeight: "700", color: "#404145" },
  priceDesc: { fontSize: "14px", color: "#62646a", marginBottom: "25px", lineHeight: "1.4" },
  orderBtn: { width: "100%", backgroundColor: "#1dbf73", color: "#fff", padding: "14px", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginBottom: "12px" },
  backBtn: { width: "100%", backgroundColor: "#fff", color: "#62646a", padding: "12px", border: "1px solid #e4e5e7", borderRadius: "4px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
  modalContent: { backgroundColor: "#fff", padding: "30px", borderRadius: "8px", maxWidth: "550px", width: "90%", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", textAlign: "center" },
  emailCard: { backgroundColor: "#f7f9fa", padding: "15px", borderRadius: "6px", margin: "20px 0", textAlign: "left", border: "1px solid #e4e5e7" },
  gmailBtn: { flex: 1, backgroundColor: "#1dbf73", color: "#fff", padding: "12px", borderRadius: "4px", textDecoration: "none", fontWeight: "600", fontSize: "14px", display: "inline-block", textAlign: "center" },
  closeBtn: { flex: 1, backgroundColor: "#fff", color: "#62646a", border: "1px solid #e4e5e7", padding: "12px", borderRadius: "4px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }
};

export default GigDetails;