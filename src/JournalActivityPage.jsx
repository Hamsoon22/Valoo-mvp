import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function JournalIntroPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ⬇️ 전체 필요한 값 다 받기
  const {
    name = "사용자",
    topValues = ["일", "학업"],
    importance,
    commitment,
    results
  } = location.state || {};

  const handleNext = () => {
    navigate("/journal/write");
  };

  const handleBack = () => {
    // ⬇️ 다시 ResultPage로 갈 때 모든 데이터 함께 전달
    navigate("/result", {
      state: {
        name,
        topValues,
        importance,
        commitment,
        results
      }
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>일기 쓰기</h2>

      <p style={{ textAlign: "center", fontWeight: "600" }}>
        ‘{name}’님의 중요한 가치
      </p>

      <p style={{ textAlign: "center", fontWeight: "600", color: "#111" }}>
        <span style={{ color: "#4c8eff" }}>{topValues[0]}</span>, <span style={{ color: "#4c8eff" }}>{topValues[1]}</span>에 대해 일기를 적어보아요
      </p>

      <p style={{ textAlign: "center", fontWeight: "500", marginBottom: "2rem" }}>
        이 가치가 당신에게 중요한 이유는 무엇일까요?
      </p>

      <textarea
        placeholder="내용 입력하기"
        maxLength={500}
        style={{
          width: "100%",
          height: "300px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          fontSize: "1rem",
          resize: "none"
        }}
      />

      <div style={{ marginTop: "1rem", textAlign: "right", fontSize: "0.9rem", color: "#888" }}>0/500</div>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "0.8rem 2rem",
            border: "1px solid black",
            borderRadius: "12px",
            backgroundColor: "white",
            color: "black",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          이전
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "black",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default JournalIntroPage;
