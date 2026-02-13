import { COMPONENTS } from "../components/index";

export default function PreviewRenderer({ tree }) {
  const navbar = tree.find(n => n.type === "Navbar");
  const sidebar = tree.find(n => n.type === "Sidebar");
  const others = tree.filter(n => n.type !== "Navbar" && n.type !== "Sidebar");

  return (
    <div style={{ height: "87vh", display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {navbar && (
        <div>
          <COMPONENTS.Navbar {...navbar.props} />
        </div>
      )}

      <div style={{ flex: 1, display: "flex", gap: "16px" }}>
        
        {sidebar && (
          <div style={{ width: "220px", flexShrink: 0, height: "100%", display: "flex" }}>
            <COMPONENTS.Sidebar {...sidebar.props} />
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          {others.length === 0 ? (
            <div style={{
              width: "80%",
              margin: "0 auto",
              padding: "40px",
              textAlign: "center",
              color: "#94a3b8",
              background: "white",
              borderRadius: "12px",
              border: "2px dashed #cbd5e1"
            }}>
              Add components to see them here
            </div>
          ) : (
            others.map((node, i) => {
              const Comp = COMPONENTS[node.type];
              if (!Comp) return null;
              return <div key={i}><Comp {...node.props} /></div>;
            })
          )}
        </div>
      </div>
    </div>
  );
}