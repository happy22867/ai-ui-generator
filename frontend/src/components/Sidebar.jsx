// components/Sidebar.jsx
export default function Sidebar() {
  // Hardcoded items
  const items = ["Home", "Profile", "Settings", "Analytics", "Logout"];

  return (
    <div
      style={{
        width: "100%",
        background: "#1e293b",
        padding: "16px",
        borderRadius: "10px", // 👈 Rounded
        border: "2px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <h4
        style={{
          marginTop: 0,
          marginBottom: "12px",
          color: "white",
          fontSize: "16px"
        }}
      >
        Menu
      </h4>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "10px 12px",
            marginBottom: "6px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            color: "#475569",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#3b82f6";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.color = "#475569";
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
