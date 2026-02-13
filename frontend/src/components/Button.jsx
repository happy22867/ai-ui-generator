// components/Button.jsx
export default function Button({ label = "Click me", onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        background: "#3b82f6",
        color: "white",
        border: "2px solid #2563eb",
        borderRadius: "10px", // 👈 More rounded
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#2563eb";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#3b82f6";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      Submit
    </button>
  );
}