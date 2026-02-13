// components/Navbar.jsx
export default function Navbar({ title = "NAVBAR" }) {
  return (
    <div
      style={{
        padding: "16px 24px",
        background: "#1e293b",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        borderRadius: "10px", // 👈 Rounded
        border: "2px solid #334155",
        marginBottom: "16px", // 👈 Gap below
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span>Dashboard</span>
      <div style={{ 
        display: "flex", 
        gap: "20px",
        fontSize: "14px",
        fontWeight: "normal"
      }}>
        <span style={{ cursor: "pointer" }}>Home</span>
        <span style={{ cursor: "pointer" }}>About</span>
        <span style={{ cursor: "pointer" }}>Settings</span>
      </div>
    </div>
  );
}