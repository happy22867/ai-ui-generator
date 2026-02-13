export default function Modal({ title, content }) {
  return (
    <div
      style={{
        background: "#899cf3",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #1e293b",
        color: "#e3f87b",
        marginBottom: "16px", // spacing between other components
      }}
    >
      <h3>MODAL</h3>
      <p style={{ color: "#fdf8fc" }}>Here's the modal content!</p>
    </div>
  );
}
