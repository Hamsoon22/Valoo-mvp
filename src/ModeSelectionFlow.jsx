import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HamburgerMenu from "./HamburgerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "./Header";
import "./styles/ModeSelectionFlow.css";
import "./styles/common.css";
import "./styles/Header.css";

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
          <p className="mode-desc">
            밸류는 그룹 · 개인이 모두 가능한 워크숍이에요.<br />참가 방식을 선택해 주세요.
          </p>
          <div
            className="mode-card inactive"
            style={{ height: "90px" }}
          >
            <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👤</span>
            <strong>전문가 없이 혼자해요.</strong>
          </div>

          <div
            className={`mode-card${form.mode === "group" ? " active" : ""}`}
            style={{ height: "90px" }}
            onClick={() => handleChange("mode", "group")}
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
          <p className="mode-desc">이름은 필수이며, 나머지 항목은 선택입니다.<br />더 구체적으로 입력할수록 결과물이 더 정교해져요.</p>
          <TextField
            label="이름"
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
          <p className="mode-desc">지난 1개월 동안,<br />가장 가까운 상태의 문장을 한 가지 골라주세요.</p>
          {["우울한", "불안한", "스트레스 많은", "잘모르겠어요"].map((label, idx) => {
            const descriptions = [
              "조금 무기력하고, 괜히 축 처질 때가 많아요.",
              "걱정이 떠오르고, 마음이 잘 가라앉지 않아요.",
              "머릿속이 복잡하고, 쉬어도 쉰 것 같지 않아요.",
              "내 상태를 잘 모르겠어요."
            ];
            return (
              <div
                key={label}
                className={`mode-emotion-card${form.emotion === label ? " active" : ""}`}
                onClick={() => handleChange("emotion", label)}
              >
                <div className="mode-emotion-label">{label}</div>
                <div className="mode-emotion-desc">{descriptions[idx]}</div>
              </div>
            );
          })}
        </>
      )
    }
  ];

  const progressHeader = (
    <div className="mode-progress">
      {steps.map((s, idx) => {
        const isActive = step === idx;
        return (
          <div key={idx} className="mode-progress-step">
            <div className={`mode-progress-circle${isActive ? " active" : ""}`}>{idx + 1}</div>
            <div className={`mode-progress-label${isActive ? " active" : ""}`}>{s.label}</div>
            {isActive && <div className="mode-progress-underline" />}
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
    <>
      <div className="common-root">
        <Header
          title={stepTitles[step]}
          onBack={() => navigate(-1)}
          onMenu={() => setMenuOpen(true)}
        />
        {progressHeader}
        {steps[step].content}
      </div>
      <div className="button-row">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="cta-button outline">이전으로</button>
        )}
        <button
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : navigate("/valueintro", { state: { name: form.name } })}
          className="cta-button"
          disabled={!canGoNext()}
        >
          다음으로
        </button>
      </div>
      <div style={{ height: "5rem" }} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </>
  );
}

export default ModeSelectionFlow;