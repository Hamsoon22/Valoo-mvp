import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/ReminderImage.css";
import "./styles/common.css";
import "./styles/Header.css";

export default function ReminderImage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name = "사용자", worries = [] } = location.state || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/reminder-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ worries }),
        });

        if (!res.ok) throw new Error("API 요청 실패");

        const data = await res.json();
        setQuote(data.quote);
      } catch (err) {
        setError(true);
        setQuote("AI 문구를 생성할 수 없습니다. 다시 시도해 주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [worries]);

  return (
    <div className="common-root">
      {/* ✅ 통일된 Header 사용 */}
      <Header
        title="리마인드 이미지"
        onBack={() => navigate(-1)}
        onMenu={() => setMenuOpen(true)}
      />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      <div
          className="reminderimage-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 160px)", // 헤더 + 하단 버튼 제외
            padding: "1.5rem"
          }}
        >
        {isLoading ? (
          <>
            <p className="reminderimage-title">
              <span className="reminderimage-blue">‘{name}’</span>님 오늘 내용을 오래 기억하기 위해<br />
              글과 이미지를 만들어드릴게요.
            </p>

            <div className="reminderimage-loading">
              <CircularProgress size={64} className="reminderimage-progress" />
              <p className="reminderimage-loading-text">... 글 생성중 ...</p>
            </div>

            <div className="reminderimage-sample">
              앞으로 5년 후,
              당신이 원하는 삶을 살 수 있다면
              어떤 삶을 살게 될까요?
            </div>
          </>
        ) : (
          <>
            <p className="reminderimage-title">
              폰 배경화면으로 사용할 수 있게 <br />
              <span className="reminderimage-blue">이미지 저장</span>을 할 수 있어요.
            </p>

            <div className="reminderimage-success">
              <CheckCircleIcon className="reminderimage-checkicon" />
              <p className="reminderimage-success-text">... 글 생성 완료 ...</p>
            </div>

            <div className="reminderimage-sample">
              {quote || "AI 문구를 생성할 수 없습니다. 다시 시도해 주세요."}
            </div>
          </>
        )}
      </div>

      {!isLoading && (
        <div
          className="button-row"
          style={{
            boxSizing: "border-box",
            maxWidth: 500,
            margin: "0 auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingBottom: "3rem",
          }}
        >
          <button
            onClick={() => navigate("/remindertext")}
            className="cta-button"
          >
            리마인드 글 보기
          </button>
        </div>
      )}
    </div>
  );
}
