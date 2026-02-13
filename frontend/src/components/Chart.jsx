// components/Chart.jsx
export default function Chart() {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #e2e8f0",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <h4
        style={{
          marginTop: 0,
          marginBottom: "16px",
          color: "#1e293b",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        Monthly Revenue Growth
      </h4>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "14px",
          height: "240px",
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0"
        }}
      >
        {/* JAN */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "60px",
              background: "#3b82f6",
              borderRadius: "6px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            12%
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>Jan</div>
        </div>

        {/* FEB */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "100px",
              background: "#3b82f6",
              borderRadius: "6px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            22%
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>Feb</div>
        </div>

        {/* MAR */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "140px",
              background: "#3b82f6",
              borderRadius: "6px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            35%
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>Mar</div>
        </div>

        {/* APR */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "170px",
              background: "#3b82f6",
              borderRadius: "6px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            48%
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>Apr</div>
        </div>

        {/* MAY */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#3b82f6",
              borderRadius: "6px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            60%
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>May</div>
        </div>
      </div>
    </div>
  );
}
