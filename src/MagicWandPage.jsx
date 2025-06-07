import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import economicIcon from "./assets/economic.png";
import healthIcon from "./assets/health.png";
import educationIcon from "./assets/education.png";
import relationshipIcon from "./assets/relationship.png";
import parentingIcon from "./assets/parenting.png";
import familyIcon from "./assets/family.png";
import workIcon from "./assets/work.png";
import spiritualityIcon from "./assets/spirituality.png";
import creationIcon from "./assets/creation.png";
import environmentIcon from "./assets/environment.png";
import socialIcon from "./assets/social.png";
import "./styles/MagicWandPage.css";
import "./styles/common.css";
import "./styles/Header.css";

const worries = [
  { key: "economic", label: "경제적 문제", icon: economicIcon },
  { key: "health", label: "건강", icon: healthIcon },
  { key: "education", label: "학업·교육", icon: educationIcon },
  { key: "relationship", label: "배우자·연인", icon: relationshipIcon },
  { key: "parenting", label: "돌보기·자녀양육", icon: parentingIcon },
  { key: "family", label: "가족 관계", icon: familyIcon },
  { key: "work", label: "직장", icon: workIcon },
  { key: "spirituality", label: "영성", icon: spiritualityIcon },
  { key: "creation", label: "창조", icon: creationIcon },
  { key: "environment", label: "환경", icon: environmentIcon },
  { key: "social", label: "사회적 책임", icon: socialIcon },
  { key: "custom", label: "직접 입력", icon: null }
];

export default function MagicWandPage() {
  const [selected, setSelected] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";

  const toggleSelect = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter((k) => k !== key));
    } else if (selected.length < 2) {
      setSelected([...selected, key]);
    }
  };

  const handleNext = () => {
    const worryLabels = selected.map((key) => {
      if (key === "custom") return customInput.trim() || "직접 입력";
      const found = worries.find((w) => w.key === key);
      return found ? found.label : key;
    });
    navigate("/magicwandsplash", { state: { name, worries: worryLabels } });
  };

  return (
    <>
      <div className="common-root">
      <Header
        title="만약에 질문"
        onBack={() => navigate(-1)}
        onMenu={() => setMenuOpen(true)}  // ✅ 이 줄 추가!
      />
      </div>
      <div className="magicwand-content">
        <p className="magicwand-title">
          지금 <span className="magicwand-blue">'{name}'</span>
          님의<br /> 가장 큰 <span className="magicwand-blue">고민거리</span>는 무엇인가요?
        </p>
        <p className="magicwand-desc">
          최대 2개까지 선택 가능, 직접 입력 가능합니다.<br />
        </p>
        <div className="magicwand-worry-list">
          {worries.map((item) => {
            const isSelected = selected.includes(item.key);
            return (
              <button
                key={item.key}
                onClick={() => toggleSelect(item.key)}
                className={`magicwand-worry-btn${isSelected ? " selected" : ""}`}
              >
                {item.key === "custom" ? (
                  <AddCircleOutlineIcon fontSize="large" className="magicwand-custom-icon" />
                ) : (
                  <img src={item.icon} alt="" className="magicwand-worry-icon" />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {selected.includes("custom") && (
          <textarea
            placeholder="고민을 자유롭게 적어주세요"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="magicwand-textarea"
            rows={3}
          />
        )}
      </div>
      {/* 하단 여백 추가 */}
      <div style={{ height: "6rem" }} />
      <div className="button-row" style={{ boxSizing: "border-box", maxWidth: 500, margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <button
          onClick={handleNext}
          className="cta-button"
        >
          다음으로
        </button>
      </div>
    </>
  );
}
