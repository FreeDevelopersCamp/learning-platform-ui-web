import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          paddingBottom: "20px",
        }}
      >
        <div>
          <h4>Company</h4>
          <ul>
            <li> Business</li>
            <li>Teach on </li>
            <li>Get the app</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>Help and Support</li>
            <li>Affiliate</li>
            <li>Investors</li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li>Terms</li>
            <li>Privacy policy</li>
            <li>Cookie settings</li>
            <li>Sitemap</li>
            <li>Accessibility statement</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #555", paddingTop: "20px" }}>
        <img
          src="path-to-logo.png"
          alt="Logo"
          style={{ height: "20px", marginBottom: "10px" }}
        />
        <p>© 2024 FreeDevloperCamp, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
