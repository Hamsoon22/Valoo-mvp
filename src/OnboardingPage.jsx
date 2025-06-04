import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./assets/onboarding1.png";
import img2 from "./assets/onboarding2.png";
import img3 from "./assets/onboarding3.png";

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
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "1.5rem",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}
    >
      {/* SKIP */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1.5rem",
          fontSize: "0.9rem",
          color: "#666",
          cursor: "pointer"
        }}
        onClick={skip}
      >
        SKIP &gt;
      </div>

      {/* 텍스트 */}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#007BC7", marginBottom: "0.8rem" }}>
          {current.title}
        </h2>
        <p style={{ fontSize: "1rem", color: "#333", whiteSpace: "pre-line" }}>
          {current.subtitle}
        </p>

        {/* 인디케이터 */}
        <div style={{ marginTop: "1rem" }}>
          {onboardingSteps.map((_, i) => (
            <span
              key={i}
              style={{
                height: 8,
                width: 8,
                borderRadius: "50%",
                backgroundColor: i === step ? "#333" : "#ccc",
                display: "inline-block",
                margin: "0 4px"
              }}
            />
          ))}
        </div>
      </div>

      {/* 이미지 */}
      <div
        style={{
          flex: "1 0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={current.image}
          alt="onboarding"
          style={{
            width: "100%",
            maxWidth: "360px",
            height: "auto",
            objectFit: "contain"
          }}
        />
      </div>

      {/* 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: step > 0 ? "space-between" : "center",
          width: "100%",
          marginBottom: "1rem",
          gap: "1rem"
        }}
      >
        {step > 0 && (
          <button
            onClick={handlePrev}
            style={{
              flex: 1,
              padding: "1rem",
              fontSize: "1rem",
              border: "1px solid #007BC7",
              borderRadius: "12px",
              backgroundColor: "#fff",
              color: "#007BC7",
              cursor: "pointer"
            }}
          >
            이전으로
          </button>
        )}
        <button
          onClick={handleNext}
          style={{
            flex: 1,
            padding: "1rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#007BC7",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          {current.buttonText}
        </button>
      </div>
    </div>
  );
}

export default OnboardingPage;
