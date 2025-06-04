import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      title: "밸류에 오신 걸 환영해요.",
      subtitle: "밸류는 당신의 내면을 들여다보고,\n마음속 소중한 것들을 떠올려보는 여정이에요.",
      subtext: "(꼭 ‘올바른 답’을 찾지 않아도 괜찮아요.\n이건 ‘정답을 맞히는 시간’이 아니라\n당신이 어디쯤 있는지 잠시 멈춰서 바라보는 일이니까요.)",
      imageLabel: "온보딩 이미지1",
      buttonText: "다음(1/3)",
    },
    {
      title: "어떻게 진행되나요?",
      subtitle: "밸류는 전문가와 함께,\n당신에게 중요한 방향을 찾아보는 시간입니다.",
      subtext: "1. 내게 중요한 무언가를 골라보기\n2. 그 마음에 대해 글로 써보기\n3. 그걸 지켜갈 작은 실천 떠올리기",
      imageLabel: "온보딩 이미지2",
      buttonText: "다음(2/3)",
    },
    {
      title: "천천히, 당신의 세상으로",
      subtitle: "방향이 없다면, 지금 흘러가는 대로 가게 돼요.\n이 시간엔 당신이 정말 소중히 여기는 것을\n잠시 멈춰 바라봐 주세요.",
      subtext: "(아무도 안 본다고 생각하고, 솔직하게 써보세요.)",
      imageLabel: "온보딩 이미지3",
      buttonText: "확인(3/3)",
    }
  ];

  const current = onboardingSteps[step];

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep < onboardingSteps.length) {
      setStep(nextStep);
    } else {
      navigate("/consent");
    }
  };

  const skip = () => navigate("/consent");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", position: "relative", minHeight: "100vh" }}>
      {/* SKIP */}
      <div style={{ position: "absolute", top: "1rem", right: "1.5rem", color: "#888", fontSize: "0.9rem", cursor: "pointer" }} onClick={skip}>
        SKIP &gt;
      </div>

      {/* 타이틀 */}
      <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginTop: "3rem", whiteSpace: "pre-line" }}>
        {current.title}
      </h2>
      <p style={{ margin: "1rem 0", fontSize: "1rem", lineHeight: "1.5", whiteSpace: "pre-line" }}>
        {current.subtitle}
      </p>

      {/* 이미지 영역 */}
      <div style={{
        width: "100%",
        height: "240px",
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0",
        fontSize: "1rem",
        color: "#999"
      }}>
        {current.imageLabel}
      </div>

      {/* 회색 작은 부가 설명 */}
      <p style={{
        fontSize: "0.85rem",
        color: "#999",
        textAlign: "center",
        lineHeight: "1.5",
        whiteSpace: "pre-line"
      }}>
        {current.subtext}
      </p>

      {/* 하단 버튼 */}
      <div style={{
        position: "fixed",
        bottom: "2rem",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}>
        <button
          onClick={handleNext}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            border: step === onboardingSteps.length - 1 ? "none" : "1px solid #000",
            borderRadius: "12px",
            background: step === onboardingSteps.length - 1 ? "#000" : "white",
            color: step === onboardingSteps.length - 1 ? "white" : "black",
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
