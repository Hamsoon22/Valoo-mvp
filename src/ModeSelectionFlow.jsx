import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HamburgerMenu from "./HamburgerMenu"; 
import MenuIcon from "@mui/icons-material/Menu";

function ModeSelectionFlow() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    mode: "",
    name: "",
    gender: "",
    age: "",
    job: "",
    emotion: ""
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const stepTitles = ["참가 방식 선택", "기본 정보 입력", "감정 상태 선택"];

  const steps = [
    {
      label: "참가방식",
      content: (
        <>
          <p>밸류는 그룹 · 개인이 모두 가능한 워크숍이에요.<br />참가 방식을 선택해 주세요.</p>
          <div
            style={{
              ...cardStyle,
              opacity: 0.4,
              cursor: "not-allowed",
              height: "90px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👤</span>
            <strong>전문가 없이 혼자해요.</strong>
          </div>

          <div
            onClick={() => handleChange("mode", "group")}
            style={{
              ...cardStyle,
              border: form.mode === "group" ? "2px solid #00A6E9" : "1px solid #ccc",
              backgroundColor: form.mode === "group" ? "#f0faff" : "#fff",
              color: form.mode === "group" ? "#00A6E9" : "#444",
              height: "90px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</span>
            <strong>전문가와 함께해요.</strong>
          </div>
        </>
      )
    },
    {
      label: "기본정보",
      content: (
        <>
          <p>이름은 필수이며, 나머지 항목은 선택입니다.<br />더 구체적으로 입력할수록 결과물이 더 정교해져요.</p>

          <TextField
            label="이름 *"
            required
            fullWidth
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="성별"
            fullWidth
            value={form.gender}
            onChange={e => handleChange("gender", e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">선택 안 함</MenuItem>
            <MenuItem value="남성">남성</MenuItem>
            <MenuItem value="여성">여성</MenuItem>
            <MenuItem value="기타">기타</MenuItem>
          </TextField>

          <TextField
            select
            label="나이"
            fullWidth
            value={form.age}
            onChange={e => handleChange("age", e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">선택 안 함</MenuItem>
            <MenuItem value="10대">10대</MenuItem>
            <MenuItem value="20대">20대</MenuItem>
            <MenuItem value="30대">30대</MenuItem>
            <MenuItem value="40대">40대</MenuItem>
            <MenuItem value="50대 이상">50대 이상</MenuItem>
          </TextField>

          <TextField
            label="직업"
            fullWidth
            value={form.job}
            onChange={e => handleChange("job", e.target.value)}
          />
        </>
      )
    },
    {
      label: "감정상태",
      content: (
        <>
          <p>지난 1개월 동안,<br />가장 가까운 상태의 문장을 한 가지 골라주세요.</p>
          {[
            {
              label: "우울한",
              description: "요즘 조금 무기력하고, 괜히 축 처질 때가 많아요."
            },
            {
              label: "불안한",
              description: "자꾸 걱정이 떠오르고, 마음이 잘 가라앉지 않아요."
            },
            {
              label: "스트레스 많은",
              description: "요즘 머릿속이 복잡하고, 쉬어도 쉰 것 같지 않아요."
            },
            {
              label: "잘모르겠어요",
              description: "내 상태를 잘 모르겠어요."
            }
          ].map(({ label, description }) => (
            <div
              key={label}
              onClick={() => handleChange("emotion", label)}
              style={{
                border: form.emotion === label ? "2px solid #00A6E9" : "1px solid #ccc",
                backgroundColor: form.emotion === label ? "#f0faff" : "#fff",
                color: form.emotion === label ? "#00A6E9" : "#444",
                padding: "1.5rem",
                margin: "1rem 0",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{label}</div>
              <div style={{ fontWeight: "normal" }}>{description}</div>
            </div>
          ))}
        </>
      )
    }
  ];

  const progressHeader = (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      marginBottom: "1.5rem",
      paddingBottom: "0.5rem"
    }}>
      {steps.map((s, idx) => {
        const isActive = step === idx;
        return (
          <div key={idx} style={{ textAlign: "center", flex: 1 }}>
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: isActive ? "#000" : "#aaa",
              color: "#fff",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.85rem",
              fontWeight: "bold",
              marginBottom: "0.3rem"
            }}>
              {idx + 1}
            </div>
            <div style={{
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#000" : "#999",
              fontSize: "0.95rem"
            }}>
              {s.label}
            </div>
            {isActive && (
              <div style={{ height: "3px", backgroundColor: "#000", marginTop: "0.4rem" }} />
            )}
          </div>
        );
      })}
    </div>
  );

  const canGoNext = () => {
    if (step === 0) return form.mode !== "";
    if (step === 1) return form.name.trim() !== "";
    return true;
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "500px", margin: "0 auto", position: "relative" }}>
      {/* 상단 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <IconButton onClick={() => navigate("/consent")}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{stepTitles[step]}</div>
        <IconButton onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>
      </div>

      {progressHeader}
      {steps[step].content}

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={largeWhiteButton}>이전으로</button>
        )}
        <button
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : navigate("/valueintro", { state: { name: form.name } })}
          style={largeBlueButton}
          disabled={!canGoNext()}
        >
          다음으로
        </button>
      </div>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  );
}

const cardStyle = {
  borderRadius: "12px",
  padding: "2rem",
  margin: "1rem 0",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  transition: "all 0.2s ease"
};

const largeWhiteButton = {
  flex: 1,
  height: "56px",
  fontSize: "1rem",
  backgroundColor: "#fff",
  border: "1px solid #0097D8",
  color: "#0097D8",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer"
};

const largeBlueButton = {
  flex: 1,
  height: "56px",
  fontSize: "1rem",
  backgroundColor: "#0097D8",
  border: "none",
  color: "#fff",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default ModeSelectionFlow;