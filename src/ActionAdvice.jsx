import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";

export default function ActionAdvice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name = "사용자", worries = [], input = "" } = location.state || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdvice = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/action-advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ worries, input })
        });

        const data = await response.json();
        setAdvice(data.advice);
      } catch (error) {
        console.error("Error fetching advice:", error);
        setAdvice("추천을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getAdvice();
  }, [worries, input]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header title="앞으로의 행동 추천" setMenuOpen={setMenuOpen} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      <div style={{ padding: "1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ fontSize: "0.9rem", color: "#888", textAlign: "center" }}>
          AI가 추천하는 행동이므로 참고용입니다. <br />
          자세한 사항은 전문가와 상담을 추천드립니다.
        </p>

        <h3 style={{ textAlign: "center", marginTop: "1.2rem" }}>
          <span style={{ color: "#008BDB", fontWeight: "bold" }}>‘{name}’</span>님에게 다음 행동들을 추천합니다.<br />
          우리 작은 것부터 해볼까요?
        </h3>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#999" }}>로딩 중...</p>
        ) : (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#F9FAFB",
              borderRadius: "1rem",
              border: "1px solid #eee",
              textAlign: "center"
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              {advice}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/reminder")}
            style={{
              backgroundColor: "#00AEEF",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "1rem",
              width: "100%",
              border: "none",
              borderRadius: "0.75rem"
            }}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
