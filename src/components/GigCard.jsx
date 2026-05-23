import React from "react";
import { Link } from "react-router-dom"; 

const GigCard = ({ item }) => {
  return (

    <Link to={`/gig/${item.id || item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      
      <div className="gigCard" style={styles.card}>

        <img 
          src={item.cover || "https://images.pexels.com/photos/3184257/pexels-photo-3184257.jpeg"} 
          alt={item.title} 
          style={styles.image} 
        />
        

        <div style={styles.info}>
          <h3 style={styles.title}>{item.title}</h3>
          <p style={styles.desc}>{item.description}</p>
          <span style={styles.badge}>{item.category || "Design"}</span>

          <div style={styles.priceContainer}>
            <span style={styles.starting}>STARTING AT</span>
            <span style={styles.price}>${item.price || "5"}</span>
          </div>
        </div>
      </div>

    </Link>
  );
};


const styles = {
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e4e5e7",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  image: { 
    width: "100%", 
    height: "170px", 
    objectFit: "cover",
    display: "block"
  },
  info: { 
    padding: "15px", 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px",
    flexGrow: 1
  },
  title: { 
    fontSize: "16px", 
    fontWeight: "700", 
    color: "#404145", 
    margin: 0,
    textTransform: "capitalize"
  },
  desc: { 
    fontSize: "14px", 
    color: "#7a7d85", 
    margin: 0, 
    height: "40px", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  badge: { 
    backgroundColor: "#f1f1f1", 
    padding: "4px 10px", 
    borderRadius: "20px", 
    fontSize: "12px", 
    width: "fit-content", 
    color: "#62646a", 
    fontWeight: "600",
    textTransform: "uppercase"
  },
  priceContainer: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderTop: "1px solid #efeff0", 
    paddingTop: "12px", 
    marginTop: "auto" 
  },
  starting: { 
    fontSize: "10px", 
    color: "#a6a9b2", 
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  price: { 
    fontSize: "18px", 
    fontWeight: "700", 
    color: "#404145" 
  }
};

export default GigCard;