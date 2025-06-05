// ActionAdvice.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";

export default function ActionAdvice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name = "사용자", worries = [] } = location.state || {};
  const [menuOpen, setMenuOpen] = useState(false);

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

        {worries.length === 0 && (
          <p style={{ textAlign: "center", color: "#AAA", marginTop: "2rem" }}>
            선택된 고민이 없습니다. 😢
          </p>
        )}

        {worries.map((worry, index) => (
          <div key={index} style={{ marginTop: "2rem" }}>
            <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>... {worry}과 관련된 행동 ...</p>
            <div
              style={{
                marginTop: "0.5rem",
                padding: "1rem",
                backgroundColor: "#F9FAFB",
                borderRadius: "1rem",
                border: "1px solid #eee",
                textAlign: "center"
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                여기에 '{worry}' 관련 추천이 들어갑니다 (아직 준비 중)
              </p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/reminderintro")}
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
