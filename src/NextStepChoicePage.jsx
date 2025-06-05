import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import nextstepImg from "./assets/nextstep.png";
import HamburgerMenu from "./HamburgerMenu";

function NextStepChoicePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "500px", margin: "0 auto", position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 상단 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <IconButton onClick={() => navigate("/consent")}> <ArrowBackIosNewIcon fontSize="small" /> </IconButton>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>갈림길</div>
        <IconButton onClick={() => setMenuOpen(true)}><MenuIcon /></IconButton>
      </div>

      {/* 텍스트 */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p>갈림길이 나타났어요.</p>
        <p style={{ color: "#00A6E9", fontWeight: "bold" }}>{name}님의 다음 여정을 선택해보세요.</p>
      </div>

      {/* 선택지 카드 */}
      <div
        onClick={() => handleSelect("/journal")}
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1rem",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#fff"
        }}
      >
        <span>📝</span>
        내 가치를 더 이해해볼래요.
      </div>

      <div
        onClick={() => handleSelect("/magicwand")}
        style={{
          border: "2px solid #00A6E9",
          backgroundColor: "#f0faff",
          borderRadius: "12px",
          padding: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "#00A6E9",
          cursor: "pointer"
        }}
      >
        <span>✨</span>
        지금 내 고민을 탐색할래요.
      </div>

      {/* 이미지 하단 */}
      <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
        <img
          src={nextstepImg} alt="next background" 
          style={{ width: "100%", objectFit: "contain" }}
        />
      </div>
       {/* ✅ 여기 넣기 */}
    <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  );
}

export default NextStepChoicePage;