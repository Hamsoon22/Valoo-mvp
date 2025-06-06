import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import HamburgerMenu from "./HamburgerMenu";
import Header from "./Header";
import "./styles/Header.css";
import "./styles/SurveyFlow.css";
import "./styles/common.css";

const questions = [
  "태어난 가족 (부모님, 형제 등)",
  "친밀한 관계 (부부, 연인, 배우자 등)",
  "양육하기·돌보기·부모되기",
  "친구관계,사회생활",
  "일·직업·커리어",
  "배우기·자신에 대한 교육 및 훈련",
  "휴식·즐거운 활동 및 취미",
  "종교 혹은 영적활동",
  "사회에 참여하기·시민의식",
  "자신을 신체적으로 돌보기 (운동, 수면, 식이 등)",
  "환경문제",
  "예술·창조성"
];

export function ValueIntroTitle({ step }) {
  const titleText = step === 1 ? "내가 가치롭게 여기는 정도" : "내가 헌신(행동)하는 정도";
  const description = step === 1
    ? (
      <>
        사람마다 중요하게 여기는 가치가 다르며, 정답은 없습니다.<br />
        가장 중요하다고 생각되면 10,<br />
        중요하지 않다고 생각되면 1입니다.
      </>
    )
    : (
      <>
        각 가치 점수 만큼, 내가 실제로 삶 속에서<br />
        실천하고 있는지를 떠올려보세요.<br />
        중요도가 3인데 3만큼 실천하고 있으면 10입니다.
      </>
    );

  return (
    <div className="survey-title-container">
      <div className="survey-title-box">{titleText}</div>
      <p className="survey-title-desc">{description}</p>
    </div>
  );
}

function QuestionSection({ step, responses, setResponses, onNext, onBack, disabledIndices  = [], importance = [], menuOpen, setMenuOpen, navigate }) {
  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = parseInt(value);
    setResponses(updated);
  };

  const isImportance = step === 1;
  const labelLeft = isImportance ? "1 중요하지 않음" : "1 헌신하지 않음";
  const labelRight = isImportance ? "10 매우 중요" : "10 매우 헌신";

  return (
    <div>
      <ul
        className="survey-question-list"
      >
        {questions.map((q, idx) => {
          const isDisabled = disabledIndices.includes(idx);
          return (
            <li
              key={idx}
              className={`survey-question-item${idx === questions.length - 1 ? " last" : ""}`}
            >
              <div className={`survey-question-label${isDisabled ? " disabled" : ""}`}>{`${idx + 1}. ${q}`}</div>
              {isDisabled ? (
                <div className="survey-question-disabled">해당 없음으로 선택된 항목입니다.</div>
              ) : (
                <>
                  <div className="survey-question-range-labels">
                    <span>{labelLeft}</span><span>{labelRight}</span>
                  </div>
                  <div className="survey-slider-bar-wrap">
                    <div className="survey-slider-bar"></div>
                    <div
                      className="survey-slider-fill"
                      style={{
                        width: `${(responses[idx] ?? 0) * 10}%`
                      }}
                    ></div>
                  </div>
                  <div className="survey-radio-row">
                    {[...Array(10)].map((_, i) => {
                      const score = i + 1;
                      return (
                        <label key={score} className="survey-radio-label">
                          {responses[idx] === score && (
                            <div className="survey-score-badge">{score}</div>
                          )}
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            value={score}
                            checked={responses[idx] === score}
                            onChange={() => handleChange(idx, score)}
                            className="survey-radio-input"
                          />
                        </label>
                      );
                    })}
                  </div>
                  {step === 2 && (
                  <div className="survey-question-importance">
                    내가 가치롭게 여기는 정도: <strong>{importance[idx] ?? '선택 안함'}</strong>
                  </div>
                )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function calculateResults(importance, commitment) {
  const validImportance = importance.map(v => v ?? 0);
  const validCommitment = commitment.map(v => v ?? 0);

  const scored = questions.map((q, i) => ({
    label: q,
    importance: validImportance[i],
    commitment: validCommitment[i],
    index: i
  }));

  const feedback1 = scored.filter(item => item.importance >= 9).sort((a, b) => b.importance - a.importance).map(item => item.label);
  const feedback2 = scored.filter(item => item.importance >= 9 && item.commitment <= 6).sort((a, b) => b.importance - a.importance).map(item => item.label);
  const score = scored.reduce((sum, val) => sum + val.importance * val.commitment, 0) / 12;

  return { feedback1, feedback2, score };
}

function SurveyFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [importance, setImportance] = useState(Array(12).fill(undefined));
  const [commitment, setCommitment] = useState(Array(12).fill(undefined));
  const [results, setResults] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ 여기로 이동!

  const handleNext = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    const res = calculateResults(importance, commitment);
    navigate("/result", {
      state: { results: res, importance, commitment, name: "사용자" }
    });
  };

  const handleReset = () => {
    setImportance(Array(12).fill(undefined));
    setCommitment(Array(12).fill(undefined));
    setResults(null);
    setStep(1);
  };

  return (
    <>
      <div className="common-root">
        <Header title="내 삶의 방향 찾기" onBack={() => window.history.length > 1 ? navigate(-1) : navigate("/")} onMenu={() => setMenuOpen(true)} />
        <ValueIntroTitle step={step} />
        {step === 1 && (
          <QuestionSection
            step={step}
            responses={importance}
            setResponses={setImportance}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            navigate={navigate}
          />
        )}
        {step === 2 && (
          <QuestionSection
            step={step}
            responses={commitment}
            setResponses={setCommitment}
            disabledIndices={importance.map((v, i) => v === 0 && (i === 0 || i === 2) ? i : null).filter(i => i !== null)}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            navigate={navigate}
            importance={importance}
          />
        )}
        {step === 3 && results && (
          <ResultPage results={results} importance={importance} commitment={commitment} onReset={handleReset} />
        )}
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      </div>
      {/* CTA 버튼 영역 */}
      {step === 1 && (
        <div className="button-row">
          <button onClick={() => navigate("/valueintro")} className="cta-button outline">이전</button>
          <button onClick={handleNext} className="cta-button">다음</button>
        </div>
      )}
      {step === 2 && (
        <div className="button-row">
          <button onClick={() => setStep(1)} className="cta-button outline">이전</button>
          <button onClick={handleSubmit} className="cta-button">다음</button>
        </div>
      )}
    </>
  );
}

export default SurveyFlow;
