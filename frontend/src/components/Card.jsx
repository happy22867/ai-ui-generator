// components/Card.jsx
export default function Card({ title = "Card Title", content = "This is card content" }) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #e2e8f0",
        borderRadius: "12px", // 👈 Rounded
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <h3 style={{ 
        marginTop: 0, 
        marginBottom: "10px", 
        color: "#1e293b",
        fontSize: "18px"
      }}>
        Card
      </h3>
      <p style={{ 
        margin: 0, 
        color: "#64748b",
        lineHeight: "1.6"
      }}>
        Welcome to the card component! 
      </p>
    </div>
  );
}