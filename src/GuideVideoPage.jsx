import React from "react";
import { useNavigate } from "react-router-dom";

function GuideVideoPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goNext = () => {
    navigate("/values");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>GuideVideo</h2>
      <p>This is the GuideVideoPage.</p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={goBack} style={{ marginRight: "1rem" }}>이전</button>
        <button onClick={goNext}>다음</button>
      </div>
    </div>
  );
}

export default GuideVideoPage;
