// ReminderImageFinal.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";

// 예시 이미지 매핑: 가치 키워드에 따라 이미지 파일 경로 지정
import imgFamily from "./assets/reminder/family.jpg";
// import imgWork from "./assets/reminder/work.jpg";
// import imgSpirituality from "./assets/reminder/spirituality.jpg";
// import imgHealth from "./assets/reminder/health.jpg";
// import imgCreation from "./assets/reminder/creation.jpg";
// import imgEducation from "./assets/reminder/education.jpg";
// import imgSocial from "./assets/reminder/social.jpg";
// import imgEnvironment from "./assets/reminder/environment.jpg";
// import imgParenting from "./assets/reminder/parenting.jpg";
// import imgRelationship from "./assets/reminder/relationship.jpg";
// import imgEconomic from "./assets/reminder/economic.jpg";
// import imgSelfCare from "./assets/reminder/selfcare.jpg";

const imageMap = {
  "가족 관계": imgFamily,
//   "직장": imgWork,
//   "영성": imgSpirituality,
//   "건강": imgHealth,
//   "창조": imgCreation,
//   "학업·교육": imgEducation,
//   "사회적 책임": imgSocial,
//   "환경": imgEnvironment,
//   "돌보기·자녀양육": imgParenting,
//   "배우자·연인": imgRelationship,
//   "경제적 문제": imgEconomic,
//   "자기 자신에 대한 돌봄": imgSelfCare
};

export default function ReminderImageFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = location.state?.name || "사용자";
  const topValues = location.state?.topValues || [];

  const selectedValue = topValues[0] || "가족 관계"; // 기본값 fallback
  const selectedImage = imageMap[selectedValue];

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "reminder_image.jpg";
    link.click();
  };

  return (
    <div style={{ backgroundColor: "#EEDBCB", minHeight: "100vh" }}>
      {/* <Header title="리마인드 이미지" setMenuOpen={setMenuOpen} /> */}
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      <div style={{ padding: "1.5rem", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontWeight: "bold", lineHeight: 1.5 }}>
          <span style={{ color: "#222" }}>
            ‘{name}’님의 소중한 방향성과 표현을 담아,
            <br />
            간직할 수 있는 리마인드 이미지를 만들었어요.
          </span>
        </p>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <img
            src={selectedImage}
            alt="Reminder"
            style={{
              width: "100%",
              maxWidth: 300,
              height: "auto",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          />
        </div>

        <button
          onClick={downloadImage}
          style={{
            marginTop: "2rem",
            padding: "1rem",
            width: "100%",
            maxWidth: 280,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "0.75rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          ⬇ 이미지 다운 받기
        </button>
      </div>
    </div>
  );
}
