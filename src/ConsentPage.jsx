import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConsentPage() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    sensitive: false,
  });

  const [modalType, setModalType] = useState(null); // "terms" | "privacy" | "sensitive" | null

  const contentMap = {
    terms: `
제1조. 목적
이 약관은 사용자와 ‘valoo’에서 제공하는 심리 워크시트 및 관련 서비스의 이용에 있어 필요한 조건과 책임을 규정합니다.

제2조. 서비스 내용
valoo는 사용자의 감정 및 삶의 방향을 탐색할 수 있도록 돕는 워크시트형 인터페이스를 제공합니다.

...이하 생략
`,
    privacy: `
[개인정보 처리방침 예시]
- 수집 항목: 이름, 이메일, 사용 로그
- 수집 목적: 사용자 맞춤 서비스 제공
- 보유 기간: 서비스 종료 시까지
`,
    sensitive: `
[민감정보 수집 및 이용 동의 예시]
본 서비스는 사용자의 심리 상태, 감정 표현 등의 민감 정보를 수집할 수 있으며, 이는 익명으로 처리되어 연구 및 서비스 개선 목적으로만 사용됩니다.
`
  };

  const toggleCheck = (key) => {
    const updated = { ...checks, [key]: !checks[key] };
    setChecks(updated);
    setAllChecked(Object.values(updated).every(Boolean));
  };

  const handleAllCheck = () => {
    const newVal = !allChecked;
    setAllChecked(newVal);
    setChecks({
      terms: newVal,
      privacy: newVal,
      sensitive: newVal,
    });
  };

  const isRequiredAgreed = checks.terms;

  return (
    <div style={{ height: "100vh", backgroundColor: "#000", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      {/* 바텀시트 영역 */}
      <div style={{
        backgroundColor: "#fff",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
        padding: "1.5rem",
        boxSizing: "border-box"
      }}>
        <h3 style={{ marginBottom: "0.5rem" }}>약관 동의가 필요합니다.</h3>
        <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1.5rem" }}>
          선택 항목 동의 없이 이용 가능하나,<br />
          최종 결과물이 제공되지 않을 수 있습니다.
        </p>

        <label style={checkboxStyle}>
          <input type="checkbox" checked={allChecked} onChange={handleAllCheck} />
          <strong style={{ marginLeft: "0.5rem" }}>모두 동의</strong>
        </label>

        <hr />

        <label style={checkboxStyle}>
          <input type="checkbox" checked={checks.terms} onChange={() => toggleCheck("terms")} />
          <span style={{ marginLeft: "0.5rem" }}>(필수) 서비스 이용약관 동의</span>
          <span style={viewBtn} onClick={() => setModalType("terms")}>보기</span>
        </label>

        <label style={checkboxStyle}>
          <input type="checkbox" checked={checks.privacy} onChange={() => toggleCheck("privacy")} />
          <span style={{ marginLeft: "0.5rem" }}>(선택) 개인정보 처리방침 동의</span>
          <span style={viewBtn} onClick={() => setModalType("privacy")}>보기</span>
        </label>

        <label style={checkboxStyle}>
          <input type="checkbox" checked={checks.sensitive} onChange={() => toggleCheck("sensitive")} />
          <span style={{ marginLeft: "0.5rem" }}>(선택) 민감정보 수집 및 이용 동의</span>
          <span style={viewBtn} onClick={() => setModalType("sensitive")}>보기</span>
        </label>

        <button
          disabled={!isRequiredAgreed}
          onClick={() => navigate("/modeselection")}  // ✅ 여기서 navigate 사용 가능
          style={{
            marginTop: "2rem",
            width: "100%",
            padding: "1rem",
            backgroundColor: isRequiredAgreed ? "#0097D8" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            cursor: isRequiredAgreed ? "pointer" : "default"
          }}
        >
          동의완료
        </button>
      </div>

      {/* === 모달 === */}
      {modalType && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* 헤더 */}
          <div style={{
            padding: "1rem",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{ margin: 0 }}>
              {{
                terms: "이용약관",
                privacy: "개인정보 처리방침",
                sensitive: "민감정보 수집 및 이용 동의"
              }[modalType]}
            </h3>
            <button onClick={() => setModalType(null)} style={{ fontSize: "1.2rem", background: "none", border: "none" }}>✕</button>
          </div>

          {/* 내용 */}
          <div style={{
            padding: "1rem",
            overflowY: "auto",
            flex: 1,
            fontSize: "0.95rem",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap"
          }}>
            {contentMap[modalType]}
          </div>
        </div>
      )}
    </div>
  );
}

const checkboxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "1rem 0"
};

const viewBtn = {
  fontSize: "0.9rem",
  color: "#0097D8",
  marginLeft: "0.5rem",
  cursor: "pointer"
};

export default ConsentPage;
