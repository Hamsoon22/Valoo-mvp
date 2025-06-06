import React from "react";
import { useNavigate } from "react-router-dom";
import reminderImage from "./assets/reminder_intro.png";

export default function ReminderIntro() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh", // ✅ 모바일 안전 높이
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          width: "390px", // iPhone 12 Pro width
          height: "844px", // iPhone 12 Pro height
          position: "relative",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <img
          src={reminderImage}
          alt="Reminder"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* 텍스트 */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            width: "100%",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            textShadow: "0 0 4px rgba(0,0,0,0.4)",
          }}
        >
          마지막으로 <br />
          오늘 내용을 오래 기억하기 위해 <br />
          글과 이미지를 만들어드릴게요.
        </div>

        {/* 버튼 */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "0",
            right: "0",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate("/reminderimage")}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "1rem",
              backgroundColor: "#00AEEF",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "0.75rem",
            }}
          >
            리마인드 글&이미지 만들기
          </button>
        </div>
      </div>
    </div>
  );
}

