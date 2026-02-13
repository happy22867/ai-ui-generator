import { useState, useEffect } from "react";
import PreviewRenderer from "./preview/PreviewRenderer";

export default function App() {
  const [tree, setTree] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [versions, setVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [toast, setToast] = useState(null);

  // Fetch all saved versions
  async function fetchVersions() {
    const res = await fetch("http://localhost:4000/versions");
    const data = await res.json();
    setVersions(data);
  }

  async function deleteVersion(index) {
  await fetch(`http://localhost:4000/versions/${index}`, { method: "DELETE" });
  fetchVersions(); // refresh versions list
  if (currentVersion === index) {
    setTree([]);
    setExplanation("");
    setCurrentVersion(0);
  }
}
  // Rollback to a version
 async function rollback(index) {
  try {
    const res = await fetch("http://localhost:4000/rollback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ versionIndex: index }),
    });

    if (!res.ok) throw new Error("Invalid version index");

    const data = await res.json();

    // ✅ Set the tree from the rolled-back version
    setTree(Array.isArray(data.tree) ? data.tree : []);

    // ✅ Update current version
    setCurrentVersion(index);

    // ✅ Update explanation
    setExplanation(
    typeof data.explanation === "string"
    ? data.explanation
    : data.explanation?.explanation || ""
);


    // Optional: You can reset input if needed
    // setInput("");

  } catch (err) {
    console.error("Rollback failed:", err.message);
  }
}


  // Generate / Modify UI
  async function generateUI() {
    if (!input.trim()) return;

    const isFresh = /create|generate|build|new ui/i.test(input);

    const res = await fetch("http://localhost:4000/generate-ui", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        previousTree: isFresh ? [] : tree,
        mode: isFresh ? "fresh" : "modify"
      }),
    });

    const data = await res.json();
    console.log("Response from server:", data);

    // Handle toast message - STOP HERE if there's an error
    if (data.toast) {
      setToast(data.toast);
      setInput("");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // Only update if no toast error
    setTree(data.tree);
    
    setExplanation(
      typeof data.explanation === "string"
        ? data.explanation
        : data.explanation?.explanation || ""
    );

    setInput("");

    setVersions((prev) => {
      const next = [...prev, {
        tree: data.tree,
        explanation: data.explanation,
      }];
      setCurrentVersion(next.length - 1);
      return next;
    });
  }

  useEffect(() => { fetchVersions(); }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0, 
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#020617",
        color: "#e5e7eb",
        fontFamily: "Inter, system-ui, sans-serif"
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          width: "340px",
          height: "100%",
          padding: "16px",
          borderRight: "1px solid #1e293b",
          background: "#020617",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflow: "hidden"
        }}
      >
        {/* APP TITLE */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "800",
            background: "linear-gradient(90deg,#38bdf8,#818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}
        >
          AI UI Generator
        </h2>

        {/* PROMPT */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your UI idea..."
          style={{
            height: "100px",
            padding: "10px",
            resize: "none",
            borderRadius: "8px",
            background: "#020617",
            border: "1px solid #334155",
            color: "#e5e7eb",
            fontSize: "13px"
          }}
        />

        {/* GENERATE */}
        <button
          onClick={generateUI}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "600",
            color: "#020617",
            background: "linear-gradient(90deg,#38bdf8,#818cf8)",
            cursor: "pointer"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 12px rgba(129,140,248,.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "none")
          }
        >
          ✨ Generate UI
        </button>

        {/* EXPLANATION */}
        <div>
          <h4 style={{ fontSize: "13px" }}>Explanation</h4>
          <pre
            style={{
              height: "110px",
              overflowY: "auto",
              background: "#020617",
              border: "1px solid #334155",
              borderRadius: "6px",
              padding: "8px",
              fontSize: "12px"
            }}
          >
            {explanation}
          </pre>
        </div>

        {/* VERSIONS */}
        <div>
          <h4 style={{ fontSize: "13px", marginBottom: "6px" }}>
            Versions
          </h4>

          <div
            style={{
              maxHeight: "210px",
              overflowY: "auto",
              paddingRight: "4px"
            }}
          >
        {Array.isArray(versions) && versions.map((version, i) => (
  <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
    
    {/* Rollback Button */}
   <button
  onClick={() => rollback(i)} // call the centralized rollback function
  style={{
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    border: "1px solid #334155",
    background:
      currentVersion === i
        ? "linear-gradient(90deg,#38bdf8,#818cf8)"
        : "#020617",
    color: currentVersion === i ? "#020617" : "#e5e7eb",
    transition: "all .2s",
  }}
  onMouseEnter={(e) => {
    if (currentVersion !== i) e.currentTarget.style.background = "#1e293b";
  }}
  onMouseLeave={(e) => {
    if (currentVersion !== i) e.currentTarget.style.background = "#020617";
  }}
>
  ⏪ Rollback v{i}
</button>





    {/* Delete Button */}
    <button
  onClick={() => deleteVersion(i)}  // ✅ Use the separate function
  style={{
    padding: "8px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    border: "1px solid #ff5c5c",
    background: "#020617",
    color: "#ff5c5c",
    transition: "all .2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#331010";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#020617";
  }}
>
  🗑 Delete
</button>
  </div>
))}


          </div>
        </div>
      </div>

      {/* RIGHT PANEL - PREVIEW AREA */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          background: "#020617",
          padding: "24px",
          overflow: "auto",
        }}
      >
        {/* Live Preview Title */}
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",

            fontWeight: "600",
            color: "#e5e7eb",
            marginBottom: "16px",
          }}
        >
          Live Preview
        </div>

        {/* PREVIEW CANVAS */}
        <div
          style={{
            background: tree.length === 0 ? "#ffffff" : "#f8fafc", // 👈 Empty = pure white, filled = light gray
            borderRadius: "12px",
            padding: "20px",
            height:"700px",
            border: "2px solid #e2e8f0", // 👈 Halka border
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // 👈 Subtle shadow
            overflow: "auto",
          }}
        >
           {!Array.isArray(tree) || tree.length === 0 ? (
            // Empty state message
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minHeight: "480px",
                color: "#94a3b8",
                fontSize: "16px",
                fontStyle: "italic"
              }}
            >
              No components yet. Start generating UI! ✨
            </div>
          ) : (
            // Render components
            <PreviewRenderer tree={tree} />
          )}
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: toast.type === "error" ? "#dc2626" : "#16a34a",
            color: "#ffffff",
            padding: "16px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            fontSize: "14px",
            fontWeight: "500",
            zIndex: 9999,
            animation: "slideIn 0.3s ease-out"
          }}
        >
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}