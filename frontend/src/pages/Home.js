import React from 'react';
import { Link } from 'react-router-dom';
import AnonymousTitle from './AnonymousTitle';
export default function Home() {
  return (
    <div className="container">
      <div className="homebody" style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        marginTop: "40px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px", color: "#f0510c" }}>SACH</h1>
        <h2 style={{ fontWeight: "500", marginBottom: "20px", color: "#333" }}>
          Secure Anonymous Corruption Helpline
        </h2>
        <AnonymousTitle />
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#444" }}>
          Many stay silent out of fear. <strong>SACH</strong> provides a safe, anonymous way to report corruption —
          helping authorities see patterns and take action.
        </p>
        <Link to="/report" className="nav-button" style={{ marginTop: "30px", display: "inline-block",textDecoration:"none" }}>
  Report Now
</Link>
      </div>
    </div>
  );
}
