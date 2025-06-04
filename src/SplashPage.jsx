import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashImage from "./assets/splash.png"; // 이미지 경로를 실제 경로에 맞게 수정하세요

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes blinker {
            50% { opacity: 0; }
          }
        `}
      </style>
      <img src={splashImage} alt="Splash" style={styles.blinking} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#cbe7f8" // 이미지 배경과 비슷한 색
  },
  blinking: {
    width: "200px", // 필요에 따라 조정
    animation: "blinker 1s linear infinite"
  }
};

export default SplashPage;
