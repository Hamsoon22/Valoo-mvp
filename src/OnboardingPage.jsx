import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./assets/onboarding1.png";
import img2 from "./assets/onboarding2.png";
import img3 from "./assets/onboarding3.png";
import "./styles/common.css";
import "./styles/OnboardingPage.css";

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      title: "밸류에 오신 걸 환영해요.",
      subtitle: "밸류는 당신의 내면을 들여다보고,\n마음속 소중한 것들을 떠올려보는 여정이에요.",
      image: img1,
      buttonText: "다음으로",
    },
    {
      title: "어떻게 진행되나요?",
      subtitle: "밸류는 전문가와 함께 혹은 혼자서\n당신에게 중요한 방향을 찾아보는 시간이랍니다.",
      image: img2,
      buttonText: "다음으로",
    },
    {
      title: "천천히, 당신의 세상으로",
      subtitle: "아무도 안 본다고 생각하고,\n솔직하게 써보세요.",
      image: img3,
      buttonText: "시작하기",
    }
  ];

  const current = onboardingSteps[step];

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/consent");
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const skip = () => navigate("/consent");

  return (
    <div style={{position: "relative", width: "100vw", height: "100vh", overflow: "hidden"}}>
      <img
        src={current.image}
        alt="onboarding"
        className="onboarding-image"
      />
      <div className="onboarding-root">
        {/* SKIP */}
        <div className="onboarding-skip" onClick={skip}>
          SKIP &gt;
        </div>
        {/* 텍스트 */}
        <div className="onboarding-text">
          <h2 className="onboarding-title">{current.title}</h2>
          <p className="onboarding-subtitle">{current.subtitle}</p>
          {/* 인디케이터 */}
          <div className="onboarding-indicator">
            {onboardingSteps.map((_, i) => (
              <span
                key={i}
                className={`onboarding-dot${i === step ? " active" : ""}`}
              />
            ))}
          </div>
        </div>
        {/* 버튼 */}
        <div
          className={`button-row${step > 0 ? " has-prev" : " single"}`}
        >
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="cta-button outline"
            >
              이전으로
            </button>
          )}
          <button
            onClick={handleNext}
            className="cta-button"
          >
            {current.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
