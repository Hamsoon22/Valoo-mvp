import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import nextstepImg from "./assets/nextstep.png";
import HamburgerMenu from "./HamburgerMenu";
import "./styles/NextStepChoicePage.css";
import "./styles/common.css";
import "./styles/Header.css";

function NextStepChoicePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <>
      <div
        className="nextstep-bg"
        style={{ backgroundImage: `url(${nextstepImg})` }}
      />
      <div className="nextstep-root">
        {/* 상단 헤더 */}
        <div className="nextstep-header">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <div className="nextstep-title">갈림길</div>
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* 텍스트 */}
        <div className="nextstep-desc">
          <p>갈림길이 나타났어요.</p>
          <p className="nextstep-desc-highlight">{name}님의 다음 여정을 선택해보세요.</p>
        </div>

        {/* 선택지 카드 */}
        <div
          onClick={() => handleSelect("/journal")}
          className="nextstep-card"
        >
          <span>📝</span>
          내 가치를 더 이해해볼래요.
        </div>

        <div
          onClick={() => handleSelect("/magicwand")}
          className="nextstep-card active"
        >
          <span>✨</span>
          지금 내 고민을 탐색할래요.
        </div>

        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      </div>
    </>
  );
}

export default NextStepChoicePage;