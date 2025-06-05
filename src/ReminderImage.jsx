// ReminderImage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";

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
    <div style={{ backgroundColor: "#F8FCFF", minHeight: "100vh" }}>
      <Header title="리마인드 글&이미지" setMenuOpen={setMenuOpen} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      <div style={{ padding: "1.5rem", maxWidth: 500, margin: "0 auto" }}>
        {isLoading ? (
          <>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              <span style={{ color: "#008BDB" }}>‘{name}’</span>님 오늘 내용을 오래 기억하기 위해<br />
              글과 이미지를 만들어드릴게요.
            </p>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <CircularProgress size={64} style={{ color: "#00AEEF" }} />
              <p style={{ marginTop: "1rem", color: "#008BDB", fontWeight: "bold" }}>... 글 생성중 ...</p>
            </div>

            <div style={{
              marginTop: "2rem",
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              backgroundColor: "#E6F3FC",
              color: "#005B82",
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              앞으로 5년 후,
              당신이 원하는 삶을 살 수 있다면
              어떤 삶을 살게 될까요?
            </div>
          </>
        ) : (
          <>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              폰 배경화면으로 사용할 수 있게 <br />
              <span style={{ color: "#008BDB" }}>이미지 저장</span>을 할 수 있어요.
            </p>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <CheckCircleIcon style={{ fontSize: 60, color: "#00AEEF" }} />
              <p style={{ color: "#00AEEF", fontWeight: "bold", marginTop: "0.5rem" }}>... 글 생성 완료 ...</p>
            </div>

            <div style={{
              marginTop: "2rem",
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              backgroundColor: "#E6F3FC",
              color: "#005B82",
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              {quote || "AI 문구를 생성할 수 없습니다. 다시 시도해 주세요."}
            </div>

            <button
              onClick={() => navigate("/remindertext")}
              style={{
                marginTop: "2rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "#00AEEF",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                border: "none",
                borderRadius: "0.75rem"
              }}
            >
              리마인드 글 보기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
