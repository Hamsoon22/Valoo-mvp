import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./styles/Header.css";
import "./styles/ValueIntro.css";
import "./styles/common.css";
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
          <div className="value-bubble">
            <p><strong className="value-bubble-title">가치란?</strong><br />
              우리가 세상, 타인, 그리고 자기 자신과<br />
              어떻게 관계 맺기를 원하는지를 향한<br />
              마음 깊은 바람입니다.
            </p>
            <p>가치는 우리 삶을 이끄는 <strong>원칙</strong>이자,<br />
              삶에 동기를 부여해주는 <strong>방향성</strong>입니다.
            </p>
          </div>

        </>
      ),
      layout: "center"
    },
    {
      image: ValueIntro2,
      content: (
        <div className="value-bubble">
          <p><strong className="value-bubble-title">
          모든 사람이 똑같은 가치를 갖지 않아요.<br/>
          당신의 가치를 판단하지도 않아요. </strong>
          </p>

        </div>
      ),
      layout: "top"
    },
    {
      image: ValueIntro3,
      content: (
        <div className="value-bubble">
          <p><strong className="value-bubble-title">
          당신의 워크시트는 공개되지 않아요.<br/>
          지금 당신의 가치를 찾아보세요. </strong>
          </p>
        </div>
      ),
      layout: "top"
    }
  ];

  const current = pages[step];

  return (
    <>
      <div
        className="common-root value-root"
        style={{
          backgroundImage: `url(${current.image})`
        }}
      >
        <Header 
            title="내 삶의 방향 찾기" 
            onBack={() => navigate(-1)}
            onMenu={() => setMenuOpen(true)} 
        />

        <div
          className={`value-content ${current.layout === "top" ? "top" : "center"}`}
        >
          {current.content}
        </div>
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      </div>
      <div className="button-row">
        {step === 0 && (
          <button onClick={skip} className="cta-button outline">건너뛰기</button>
        )}
        <button onClick={handleNext} className="cta-button">
          {step < 2 ? "다음으로" : "시작할게요"}
        </button>
      </div>
    </>
  );
}

export default ValueIntro;
