import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "./styles/ReminderText.css";
import "./styles/common.css";

export default function ReminderQuote() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name = "사용자", worries = [] } = location.state || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("http://localhost:3001/api/reminder-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worries }),
      });

      if (!res.ok) throw new Error("API 실패");

      const data = await res.json();
      setQuote(data.quote);
    } catch (err) {
      setError(true);
      setQuote("AI 문구를 생성할 수 없습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="common-root">
      {/* 상단 고정 헤더 */}
      <Header
        title="리마인드 글"
        onBack={() => navigate(-1)}
        onMenu={() => setMenuOpen(true)}
      />
      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
      />

      {/* 본문 */}
      <div className="remindertext-content">
        <div className="remindertext-quote-box">
          <p className="remindertext-quote">
            “<br />
            {quote || "AI 문구를 생성할 수 없습니다. 다시 시도해 주세요."}
            <br />”
          </p>
        </div>
        <button
          onClick={fetchQuote}
          className="remindertext-refresh-btn"
        >
          <AutorenewIcon />
          다른 문구 받기
        </button>
      </div>
      {/* 하단 버튼 */}
    <div className="button-row">
      <button
        onClick={() => navigate("/reminderimagefinal")}
        className="cta-button"
      >
        리마인드 이미지 보기
      </button>
    </div>
    </div>
  );
}
