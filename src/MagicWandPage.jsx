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
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header title="만약에 질문" setMenuOpen={setMenuOpen} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      <div style={{ padding: "1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ textAlign: "center" }}>
          지금 <span style={{ color: "#008BDB", fontWeight: "bold" }}>'{name}'</span>
          님의 가장 큰 <span style={{ color: "#008BDB", fontWeight: "bold" }}>고민거리</span>는 무엇인가요?
        </p>
        <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
          최대 2개까지 선택 가능하며 <br />
          보기에 고민거리가 없다면 자유롭게 적어주세요.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "center"
          }}
        >
          {worries.map((item) => {
            const isSelected = selected.includes(item.key);
            return (
              <button
                key={item.key}
                onClick={() => toggleSelect(item.key)}
                style={{
                  width: "45%",
                  aspectRatio: "1 / 1",
                  border: isSelected ? "2px solid #00AEEF" : "1px solid #ccc",
                  backgroundColor: isSelected ? "#E6F3FC" : "#fff",
                  borderRadius: "1rem",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: isSelected ? "#00AEEF" : "#333",
                  transition: "all 0.2s ease"
                }}
              >
                {item.key === "custom" ? (
                  <AddCircleOutlineIcon fontSize="large" style={{ marginBottom: "0.5rem", color: "#666" }} />
                ) : (
                  <img src={item.icon} alt="" style={{ width: 40, height: 40, marginBottom: "0.5rem" }} />
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
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid #ccc",
              resize: "none",
              fontFamily: "inherit"
            }}
            rows={3}
          />
        )}

        <button
          onClick={handleNext}
          style={{
            marginTop: "2rem",
            width: "100%",
            padding: "1rem",
            backgroundColor: "#00AEEF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "0.75rem"
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
