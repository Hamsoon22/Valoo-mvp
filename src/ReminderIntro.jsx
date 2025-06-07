import React from "react";
import { useNavigate } from "react-router-dom";
import reminderImage from "./assets/reminder_intro.png";
import "./styles/ReminderIntro.css";
import "./styles/common.css";
import "./styles/Header.css";

export default function ReminderIntro() {
  const navigate = useNavigate();

  return (
    <>
      <div className="reminder-bg">
        <div className="reminder-container">
          <img
            src={reminderImage}
            alt="Reminder"
            className="reminder-img"
          />

          {/* 텍스트 */}
          <div className="reminder-text">
            마지막으로 <br />
            오늘 내용을 오래 기억하기 위해 <br />
            글과 이미지를 만들어드릴게요.
          </div>
        </div>
      </div>
      <div className="button-row">
        <button
          onClick={() => navigate("/reminderimage")}
          className="cta-button"
        >
          리마인드 글&이미지 만들기
        </button>
      </div>
    </>
  );
}

