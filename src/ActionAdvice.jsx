import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import "./styles/ActionAdvice.css";
import "./styles/Header.css";

export default function ActionAdvice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name = "사용자", worries = [], input = "" } = location.state || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdvice = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/action-advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ worries, input })
        });

        const data = await response.json();
        setAdvice(data.advice);
      } catch (error) {
        console.error("Error fetching advice:", error);
        setAdvice("추천을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getAdvice();
  }, [worries, input]);

  return (
    <>
      <div className="common-root">
        <Header title="앞으로의 행동 추천" onMenu={() => setMenuOpen(true)} />
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      </div>
      <div className="actionadvice-content">
        <p className="actionadvice-desc">
          AI가 추천하는 행동이므로 참고용입니다. <br />
          자세한 사항은 전문가와 상담을 추천드립니다.
        </p>

        <h3 className="actionadvice-title">
          <span className="actionadvice-blue">‘{name}’</span>님에게 다음 행동들을 추천합니다.<br />
          우리 작은 것부터 해볼까요?
        </h3>

        {loading ? (
          <p className="actionadvice-loading">로딩 중...</p>
        ) : (
          <div className="actionadvice-advicebox">
            <p className="actionadvice-advice">{advice}</p>
          </div>
        )}
      </div>
      <div className="button-row" style={{ boxSizing: "border-box", maxWidth: 500, margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <button
          onClick={() => navigate("/reminderintro")}
          className="cta-button"
        >
          다음으로
        </button>
      </div>
    </>
  );
}
