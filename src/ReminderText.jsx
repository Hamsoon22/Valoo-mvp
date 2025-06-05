// ReminderText.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import AutorenewIcon from "@mui/icons-material/Autorenew";

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
        body: JSON.stringify({ worries })
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
    <div style={{ backgroundColor: "#F8FCFF", minHeight: "100vh" }}>
      <Header title="리마인드 글" setMenuOpen={setMenuOpen} />
      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          padding: "1.5rem",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "2rem 1rem",
            borderRadius: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            width: "100%",
            maxWidth: 380,
            textAlign: "center"
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#00AEEF",
              whiteSpace: "pre-line"
            }}
          >
            “<br />{quote || "AI 문구를 생성할 수 없습니다. 다시 시도해 주세요."}<br />”
          </p>
        </div>

        <button
          onClick={fetchQuote}
          style={{
            marginTop: "2rem",
            backgroundColor: "#000",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "2rem",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <AutorenewIcon />
          다른 문구 받기
        </button>

        <button
          onClick={() => navigate("/reminderimagefinal")}
          style={{
            marginTop: "2rem",
            width: "100%",
            maxWidth: 400,
            padding: "1rem",
            backgroundColor: "#00AEEF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: "0.75rem",
            border: "none"
          }}
        >
          리마인드 이미지 보기
        </button>
      </div>
    </div>
  );
}
