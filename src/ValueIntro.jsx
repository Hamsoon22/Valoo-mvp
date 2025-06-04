import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import ValueIntro1 from "./assets/valueIntro1.png";
import ValueIntro2 from "./assets/valueIntro2.png";
import ValueIntro3 from "./assets/valueIntro3.png";

function ValueIntro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNext = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/survey");
    }
  };

  const skip = () => navigate("/survey");

  const pages = [
    {
      image: ValueIntro1,
      content: (
        <>
          <div style={bubbleStyle}>
            <p><strong style={{ color: "#1292EE" }}>‘가치’란?</strong><br />
              우리가 세상, 타인, 그리고 자기 자신과<br />
              어떻게 관계 맺기를 원하는지를 향한<br />
              마음 깊은 바람입니다.
            </p>
          </div>
          <div style={connector}></div>
          <div style={bubbleStyleSecondary}>
            <p>가치는 우리 삶을 이끄는 <strong>원칙</strong>이자,<br />
              삶을 살아가는 데 동기를 부여해주는 <strong>방향성</strong>입니다.
            </p>
          </div>
        </>
      ),
      layout: "center"
    },
    {
      image: ValueIntro2,
      content: (
        <div style={simpleText}>
          다음에 제시되는 내용은<br />
          일부 사람들이 중요하다고 여기는 삶의 영역입니다.<br /><br />
          모든 사람들이 동일한 가치를 가지고 있지 않으며,<br />
          이 워크시트로 당신이 올바른 가치를 지녔는지<br />
          확인하려는 것도 아닙니다.
        </div>
      ),
      layout: "top"
    },
    {
      image: ValueIntro3,
      content: (
        <div style={simpleText}>
          ‘아무도’ 이 워크시트를<br />
          읽지 않는다고 생각하시고,<br />
          당신의 가치를 찾아보세요.
        </div>
      ),
      layout: "top"
    }
  ];

  const current = pages[step];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundImage: `url(${current.image})`,
      backgroundSize: "cover",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      fontFamily: "sans-serif"
    }}>
      <Header title="내 삶의 방향 찾기" setMenuOpen={setMenuOpen} />

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: current.layout === "top" ? "flex-start" : "center",
        alignItems: "center",
        padding: "2rem 1rem",
        textAlign: "center"
      }}>
        {current.content}
      </div>

      <div style={{
        padding: "1rem",
        maxWidth: "500px",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: step === 0 ? "space-between" : "center",
        gap: "1rem"
      }}>
        {step === 0 && (
          <button onClick={skip} style={whiteButton}>건너뛰기</button>
        )}
        <button onClick={handleNext} style={blueButton}>
          {step < 2 ? "다음으로" : "시작할게요"}
        </button>
      </div>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  );
}

const bubbleStyle = {
  backgroundColor: "#fff",
  border: "1px solid #1292EE",
  borderRadius: "20px",
  padding: "1rem",
  marginBottom: "1rem",
  fontSize: "0.95rem",
  color: "#333",
  lineHeight: "1.5",
  maxWidth: "320px"
};

const bubbleStyleSecondary = {
  backgroundColor: "#d9efff",
  borderRadius: "16px",
  padding: "1rem",
  fontSize: "0.95rem",
  color: "#333",
  lineHeight: "1.5",
  maxWidth: "320px"
};

const connector = {
  height: "16px",
  width: "2px",
  backgroundColor: "#1292EE",
  margin: "0 auto",
  marginBottom: "1rem"
};

const simpleText = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "16px",
  padding: "1.2rem",
  fontSize: "0.95rem",
  color: "#111",
  lineHeight: "1.5",
  maxWidth: "320px"
};

const whiteButton = {
  flex: 1,
  padding: "0.8rem 0",
  borderRadius: "12px",
  border: "1px solid #1292EE",
  backgroundColor: "white",
  color: "#1292EE",
  fontSize: "1rem",
  maxWidth: "220px"
};

const blueButton = {
  flex: 1,
  padding: "0.8rem 0",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#1292EE",
  color: "white",
  fontSize: "1rem",
  maxWidth: "220px"
};

export default ValueIntro;
