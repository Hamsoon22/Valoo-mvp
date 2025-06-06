// ReminderImageFinal.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import "./styles/ReminderImageFinal.css";

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
    <>
      {/* 배경 이미지 + 블러 */}
      <div
        className="reminderimagefinal-bg"
        style={{
          backgroundImage: `url(${selectedImage})`
        }}
      />
      <div className="common-root">
        <Header
          title="리마인드 이미지"
          onBack={() => navigate(-1)}
        />
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

        
          <p className="reminderimagefinal-title">
            <span>
              ‘{name}’님의 소중한 방향성과 표현을 담아,
              <br />
              간직할 수 있는 리마인드 이미지를 만들었어요.
            </span>
          </p>
          <div className="reminderimagefinal-img-wrap">
            <img
              src={selectedImage}
              alt="Reminder"
              className="reminderimagefinal-img"
            />
          </div>
          <button
            onClick={downloadImage}
            className="reminderimagefinal-download-btn"
          >
            ⬇ 이미지 다운 받기
          </button>
      
      </div>
    </>
  );
}
