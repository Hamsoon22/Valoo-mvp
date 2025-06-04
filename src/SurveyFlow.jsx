import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import HamburgerMenu from "./HamburgerMenu";
import Header from "./Header"; // ✅ 공통 헤더 컴포넌트 임포트

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
    ? "사람마다 중요하게 여기는 가치가 다르며, 여기에 '정답'은 없습니다. 가장 중요하다고 생각되면 10, 중요하지 않다고 생각되면 1입니다."
    : "각 가치 점수 만큼, 내가 실제로 삶 속에서 실천하고 있는지를 떠올려보세요. 중요도가 3인데 3만큼 실천하고 있으면 10입니다.";

  return (
    <div style={{
      position: 'sticky',
      top: '56px', // 헤더 아래에 붙게
      zIndex: 99,
      backgroundColor: '#fff',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '1rem 1.2rem 1.5rem',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#f0f9ff',
        color: '#1292EE',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '16px',
        padding: '0.8rem 1rem',
        fontSize: '1rem',
        border: '1px solid #cce9ff',
        marginBottom: '0.8rem'
      }}>{titleText}</div>

      <p style={{
        fontSize: '0.85rem',
        color: '#90a4ae',
        textAlign: 'center',
        lineHeight: '1.5',
        margin: 0
      }}>{description}</p>
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
    <div style={{
      backgroundColor: '#fff',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '1.5rem 1.2rem 4rem',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {questions.map((q, idx) => {
          const isDisabled = disabledIndices.includes(idx);
          return (
            <li key={idx} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500, color: isDisabled ? '#999' : '#000' }}>{`${idx + 1}. ${q}`}</div>
              {isDisabled ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>해당 없음으로 선택된 항목입니다.</div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888' }}>
                    <span>{labelLeft}</span><span>{labelRight}</span>
                  </div>
                  <div style={{ position: 'relative', height: '20px', margin: '1rem 0' }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#eee',
                      borderRadius: '4px',
                      transform: 'translateY(-50%)'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: `${(responses[idx] ?? 0) * 10}%`,
                      height: '8px',
                      backgroundColor: '#1292EE',
                      borderRadius: '4px',
                      transform: 'translateY(-50%)',
                      transition: 'width 0.3s'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.2rem' }}>
                    {[...Array(10)].map((_, i) => {
                      const score = i + 1;
                      return (
                        <label key={score} style={{ position: 'relative' }}>
                          {responses[idx] === score && (
                            <div style={{
                              position: 'absolute',
                              top: '-30px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: '#1292EE',
                              color: '#fff',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '8px',
                              fontSize: '0.75rem'
                            }}>{score}</div>
                          )}
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            value={score}
                            checked={responses[idx] === score}
                            onChange={() => handleChange(idx, score)}
                            style={{ margin: '0 4px' }}
                          />
                        </label>
                      );
                    })}
                  </div>
                  {step === 2 && (
                  <div style={{ marginTop: '0.5rem', color: '#90a4ae', fontSize: '0.85rem' }}>
                    내가 가치롭게 여기는 정도: <strong>{importance[idx] ?? '선택 안함'}</strong>
                  </div>
                )}
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              marginRight: '1rem',
              backgroundColor: '#fff',
              color: '#1292EE',
              padding: '0.6rem 1.8rem',
              borderRadius: '8px',
              fontSize: '1rem',
              border: '1px solid #1292EE'
            }}>
            이전
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            backgroundColor: '#1292EE',
            color: 'white',
            padding: '0.6rem 1.8rem',
            borderRadius: '8px',
            fontSize: '1rem',
            border: 'none'
          }}>
          다음
        </button>
      </div>
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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header title="내 삶의 방향 찾기" setMenuOpen={setMenuOpen} />
      <ValueIntroTitle step={step} />
      {step === 1 && (
        <QuestionSection
          step={step}
          responses={importance}
          setResponses={setImportance}
          onNext={handleNext}
          onBack={() => navigate("/valueintro")}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navigate={navigate}
        />
      )}
      {step === 2 && (
        <>
        <QuestionSection
          step={step}
          responses={commitment}
          setResponses={setCommitment}
          onNext={handleSubmit}
          onBack={() => setStep(1)}
          disabledIndices={importance.map((v, i) => v === 0 && (i === 0 || i === 2) ? i : null).filter(i => i !== null)}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navigate={navigate}
          importance={importance}
        />
      </>
      )}
      {step === 3 && results && (
        <ResultPage results={results} importance={importance} commitment={commitment} onReset={handleReset} />
      )}
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  );
}

export default SurveyFlow;
