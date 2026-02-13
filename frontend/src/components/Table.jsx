// components/Table.jsx
export default function Table() {
  // Hardcoded table data
  const headers = ["Name", "Age", "Email"];
  const rows = [
    ["Alice Johnson", "28", "alice@example.com"],
    ["Bob Smith", "34", "bob@example.com"],
    ["Charlie Brown", "22", "charlie@example.com"],
    ["Diana Prince", "30", "diana@example.com"]
  ];

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        border: "2px solid #e2e8f0",
        borderRadius: "10px",
        padding: "16px",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  color: "#1e293b",
                  fontSize: "14px",
                  background: "#f1f5f9",
                  borderRadius: "4px"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                transition: "all 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #e2e8f0",
                    color: "#1e293b"
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
