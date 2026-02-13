// components/Input.jsx
export default function Input({ placeholder = "Enter text..." }) {
  return (
    <input
      placeholder="Enter text..."
      style={{
        padding: "12px 16px",
        width: "100%",
        background: "white",
        border: "2px solid #cbd5e1",
        borderRadius: "10px", // 👈 Rounded
        color: "#1e293b",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.2s",
        boxSizing: "border-box"
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#3b82f6";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#cbd5e1";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}