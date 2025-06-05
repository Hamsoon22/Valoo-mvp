import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const worryMap = {
  "경제적 문제": economicIcon,
  "건강": healthIcon,
  "학업·교육": educationIcon,
  "배우자·연인": relationshipIcon,
  "돌보기·자녀양육": parentingIcon,
  "가족 관계": familyIcon,
  "직장": workIcon,
  "영성": spiritualityIcon,
  "창조": creationIcon,
  "환경": environmentIcon,
  "사회적 책임": socialIcon
};

export default function MagicWandDescribe() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";
  const worries = location.state?.worries ?? [];

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header title="만약에 질문" setMenuOpen={setMenuOpen} />
      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
      />
      <div style={{ padding: "1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>‘{name}’님의 고민거리</p>

        {worries.length > 0 ? (
          <p style={{ textAlign: "center", color: "#008BDB", fontWeight: "bold" }}>
            ‘{worries.join("’, ‘")}’이 사라졌어요.
          </p>
        ) : (
          <p style={{ textAlign: "center", color: "#999", fontWeight: "bold" }}>
            선택한 고민거리가 없어요.
          </p>
        )}

        {worries.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "1rem",
              flexWrap: "wrap"
            }}
          >
            {worries.map((worry) => (
              <div
                key={worry}
                style={{
                  border: "2px solid #00AAFF",
                  borderRadius: "1rem",
                  padding: "0.75rem",
                  width: 120,
                  textAlign: "center",
                  backgroundColor: "#F7FCFF"
                }}
              >
                {worryMap[worry] && (
                  <img
                    src={worryMap[worry]}
                    alt={worry}
                    style={{ width: 48, height: 48, marginBottom: "0.5rem" }}
                  />
                )}
                <p
                  style={{
                    margin: 0,
                    color: "#00AAFF",
                    fontWeight: "bold",
                    fontSize: "0.95rem"
                  }}
                >
                  {worry}
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            그렇다면 현재 무엇을 가장 하고 싶은가요?
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            placeholder="내용 입력하기"
            style={{
              width: "100%",
              height: 300,
              padding: "1rem",
              borderRadius: "1rem",
              border: "1px solid #ccc",
              fontSize: "0.95rem",
              fontFamily: "inherit"
            }}
          />
          <p
            style={{
              textAlign: "right",
              color: "#999",
              fontSize: "0.85rem",
              marginTop: "0.25rem"
            }}
          >
            {input.length}/1000
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "#444"
          }}
        >
          ✨ 어떤 행동을 하면 좋을지 추천해드릴까요? ✨
        </div>

        <button
          onClick={() =>
            navigate("/magicwand/actionadvice", {
              state: { name, worries, input }
            })
          }
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "1rem",
            backgroundColor: "#00AEEF",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "0.75rem"
          }}
        >
          행동 추천 받기
        </button>
      </div>
    </div>
  );
}
