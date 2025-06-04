import React from "react";
import { useNavigate } from "react-router-dom";

function UserInfoPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goNext = () => {
    // 예: 다음 경로로 이동 (임시, 실제 경로는 App.jsx에서 수정 필요)
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>UserInfo</h2>
      <p>This is the User information.</p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={goBack} style={{ marginRight: "1rem" }}>이전</button>
        <button onClick={goNext}>다음</button>
      </div>
    </div>
  );
}

export default UserInfoPage;
