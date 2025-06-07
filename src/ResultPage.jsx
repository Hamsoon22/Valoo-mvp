import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import HamburgerMenu from "./HamburgerMenu";
import "./styles/ResultPage.css";
import "./styles/common.css";
import "./styles/Header.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function Header({ title, setMenuOpen, onBack }) {
  return (
    <div className="common-header">
      <IconButton size="small" onClick={onBack}>
        {/* 뒤로가기 아이콘 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </IconButton>
      <div className="common-step-title">{title}</div>
      <IconButton size="small" onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { results, importance, commitment, name = "사용자" } = location.state || {};

  useEffect(() => {
    if (!results || !importance || !commitment) {
      navigate("/survey");
    }
  }, [results, importance, commitment, navigate]);

  if (!results || !importance || !commitment) return null;

  const topValues = results.feedback1.slice(0, 2);
  const topValue = topValues[0] || "해당없음";
  const lowCommit = results.feedback2.length > 0 ? results.feedback2[0] : "해당없음";

  const labels = [
    "가족", "부부관계", "부모됨", "친구관계",
    "일", "교육", "즐거움", "영성", "사회참여", "신체관리", "환경", "창조성"
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "가치",
        data: importance,
        backgroundColor: "rgba(18,146,238,0.15)",
        borderColor: "#1292EE",
        borderWidth: 2
      },
      {
        label: "실천",
        data: commitment,
        backgroundColor: "rgba(166,120,255,0.15)",
        borderColor: "#A678FF",
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 2, color: "#888", font: { size: 10 } },
        pointLabels: { font: { size: 12 }, color: "#333" },
        grid: { color: "#ccc" }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#444",
          font: { size: 13 }
        }
      }
    }
  };

  const goToSelection = () => {
    navigate("/stepselection", {
      state: {
        name,
        topValues
      }
    });
  };

  const goBack = () => {
    navigate("/survey");
  };

  return (
    <>
      <div className="common-root">
      <Header title="내 삶의 방향 찾기" setMenuOpen={setMenuOpen} onBack={() => navigate(-1)} />
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      </div>
      <div className="result-title-box">
        나의 가치로운 삶 결과
      </div>

      <div className="result-content">
        <Radar data={chartData} options={chartOptions} />
        <div className="result-score-box">
          <h3 className="result-score-title">내 가치로운 삶 점수</h3>
          <div className="result-score-value">
            {results.score.toFixed(1)}
          </div>
          <p className="result-score-desc">
            당신에게 중요한 가치는 <span className="result-score-highlight">{topValue}</span>입니다.
          </p>
          <p className="result-score-desc">
            중요하지만 잘 실천하지 못하는 가치는 <span className="result-score-highlight">{lowCommit}</span>입니다. <br />
            {lowCommit === "없습니다" ? "모두 잘 실천하고 있는 편이네요." : ""}
          </p>
        </div>
        <Accordion style={{ marginTop: "2rem" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="result-detail-title">가치 실천 자세히 보기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {labels.map((label, idx) => (
              <div key={idx} className="result-detail-row">
                <Typography className="result-detail-label">{`${idx + 1}. ${label}`}</Typography>
                <div className="result-detail-bar-row">
                  <span className="result-detail-bar-label">가치</span>
                  <div className="result-detail-bar-bg value">
                    <div className="result-detail-bar-fill value" style={{ width: `${(importance[idx] ?? 0) * 10}%` }} />
                  </div>
                  <span className="result-detail-bar-value">{importance[idx] ?? 0}</span>
                </div>
                <div className="result-detail-bar-row">
                  <span className="result-detail-bar-label">실천</span>
                  <div className="result-detail-bar-bg commit">
                    <div className="result-detail-bar-fill commit" style={{ width: `${(commitment[idx] ?? 0) * 10}%` }} />
                  </div>
                  <span className="result-detail-bar-value">{commitment[idx] ?? 0}</span>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
        {/* 하단 여백 추가 */}
        <div style={{ height: "8rem" }} />
      </div>
      <div className="button-row">
        <button
          onClick={goBack}
          className="cta-button outline"
        >
          이전
        </button>
        <button
          onClick={goToSelection}
          className="cta-button"
        >
          다음
        </button>
      </div>
    </>
  );
}

export default ResultPage;