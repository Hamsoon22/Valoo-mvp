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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function Header({ title, setMenuOpen }) {
return (
<div style={{
display: 'flex', alignItems: 'center', justifyContent: 'space-between',
padding: '1rem 1.2rem', borderBottom: '1px solid #ddd',
position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100,
maxWidth: '500px', width: '100%', margin: '0 auto', boxSizing: 'border-box'
}}>
<div style={{ width: '32px' }}></div>
<div style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', flex: 1 }}>{title}</div>
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
<div style={{ backgroundColor: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
<Header title="내 삶의 방향 찾기" setMenuOpen={setMenuOpen} />
<div style={{
    backgroundColor: "#f0f9ff",
    border: "1px solid #cce9ff",
    color: "#1292EE",
    borderRadius: "16px",
    padding: "0.8rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1.2rem auto 1.5rem",
    maxWidth: "500px"
  }}>
    나의 가치로운 삶 결과
  </div>

  <div style={{ maxWidth: "500px", margin: "0 auto", padding: "0 1.2rem" }}>
    <Radar data={chartData} options={chartOptions} />

    <div style={{
      backgroundColor: "#f9f9f9",
      padding: "1.5rem",
      marginTop: "2rem",
      borderRadius: "16px",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0,0,0,0.04)"
    }}>
      <h3 style={{ color: "#1292EE", marginBottom: "0.5rem" }}>내 가치로운 삶 점수</h3>
      <div style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#333",
        backgroundColor: "#fff",
        display: "inline-block",
        padding: "0.5rem 1rem",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
        marginBottom: "1rem"
      }}>
        {results.score.toFixed(1)}
      </div>
      <p style={{ fontSize: "1rem", color: "#333" }}>
        당신에게 중요한 가치는 <span style={{ color: "#1292EE", fontWeight: "bold" }}>{topValue}</span>입니다.
      </p>
      <p style={{ fontSize: "1rem", color: "#333" }}>
        중요하지만 잘 실천하지 못하는 가치는 <span style={{ color: "#1292EE", fontWeight: "bold" }}>{lowCommit}</span>입니다. <br />
        {lowCommit === "없습니다" ? "모두 잘 실천하고 있는 편이네요." : ""}
      </p>
    </div>

    <Accordion style={{ marginTop: "2rem" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography style={{ fontWeight: 600, fontSize: "1rem", color: "#1292EE" }}>가치 실천 자세히 보기</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {labels.map((label, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <Typography style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{`${idx + 1}. ${label}`}</Typography>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
              <span style={{ width: "40px", fontSize: "0.9rem", color: "#555" }}>가치</span>
              <div style={{
                backgroundColor: "rgba(18,146,238,0.25)",
                height: "10px",
                borderRadius: "8px",
                flexGrow: 1,
                margin: "0 10px",
                position: "relative"
              }}>
                <div style={{
                  width: `${(importance[idx] ?? 0) * 10}%`,
                  height: "100%",
                  backgroundColor: "#1292EE",
                  borderRadius: "8px"
                }} />
              </div>
              <span style={{ fontSize: "0.9rem", width: "24px", textAlign: "right" }}>{importance[idx] ?? 0}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ width: "40px", fontSize: "0.9rem", color: "#555" }}>실천</span>
              <div style={{
                backgroundColor: "rgba(166,120,255,0.25)",
                height: "10px",
                borderRadius: "8px",
                flexGrow: 1,
                margin: "0 10px",
                position: "relative"
              }}>
                <div style={{
                  width: `${(commitment[idx] ?? 0) * 10}%`,
                  height: "100%",
                  backgroundColor: "#A678FF",
                  borderRadius: "8px"
                }} />
              </div>
              <span style={{ fontSize: "0.9rem", width: "24px", textAlign: "right" }}>{commitment[idx] ?? 0}</span>
            </div>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>

    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
      <button
        onClick={goBack}
        style={{
          flex: 1,
          marginRight: "0.5rem",
          backgroundColor: "#fff",
          color: "#1292EE",
          padding: "0.7rem",
          borderRadius: "8px",
          fontSize: "1rem",
          border: "1px solid #1292EE"
        }}
      >
        이전
      </button>
      <button
        onClick={goToSelection}
        style={{
          flex: 1,
          marginLeft: "0.5rem",
          backgroundColor: "#1292EE",
          color: "#fff",
          padding: "0.7rem",
          borderRadius: "8px",
          fontSize: "1rem",
          border: "none"
        }}
      >
        다음
      </button>
    </div>
  </div>

  <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
</div>

);
}

export default ResultPage;