import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";

export default function ActionAdvice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, worries = [], input = "" } = location.state || {};
  const [summary, setSummary] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedList, setCheckedList] = useState([]);
  const hasFetchedRef = useRef(false); // ✅ 컴포넌트 위쪽에 선언

  // 즐거운 활동 목록 (요약 버전, 실제로는 전체 리스트를 사용)
  const activityList = [
    "개천에서 낚시",
    "커피숍에서 신문 읽기",
    "친구 둘을 불러서 볼링장 가기",
    "연인과 키스만 하는 데이트 약속",
    "원반 던지며 놀기",
    "레스토랑에서 초콜렛케익 시켜먹기",
    "아이랑 미니골프 데려가서 같이 놀기",
    "집에 꽃 사 오기",
    "요가수업 듣기",
    "마사지 받기",
    "실내암벽등반센터에 가서 수업받기",
    "고등학교 또는 대학교 때 본 책 새로 읽기",
    "눈사람 만들고 눈싸움 하기",
    "이웃을 위해 쿠키 만들어 주기",
    "눈 온 길 밟으며 소리 듣기",
    "중고장터 물건 내다 팔기(이웃과 같이)",
    "눈송이 손으로 움켜쥐기",
    "철사를 사서 사물 형상 만들어 보기",
    "조각공예 수업 등록하기",
    "미술관에 가서 맘에 드는 작품 찾아보기",
    "케이크 굽기",
    "아무 것도 모르는 주제에 관한 잡지 사보기",
    "드로잉",
    "당신이 가진 모든 신발 광내기",
    "그림(유화, 아크릴, 수채화)",
    "새로운 식물 하나 사기",
    "나무에 오르기",
    "장롱 청소하기",
    "저녁 드라이브 가기",
    "지역신문사 편집인에게 편지쓰기",
    "자동차 극장 관람하기",
    "탁자나 찬장 새로 색칠하기",
    "영화보기",
    "아침을 식당서 먹기",
    "무료급식소 배식 자원하기",
    "음식을 붉은색, 흰색, 푸른색으로 만들어보기",
    "박물관 주말 행사에 참여하기",
    "3일간의 휴가 계획하기",
    "친구에게 편지쓰기",
    "하트모양의 돌을 모으기로 시작",
    "노래부르기",
    "유튜브에서 좋은 영상 3편 구해서 친구와 공유",
    "악기 연주하기",
    "목공으로 탁자나 의자 만들기",
    "미술수업 듣기",
    "좋아하는 영화음악으로 CD굽기",
    "개와 산책",
    "댄스교습 수강",
    "애견보호소에 개와 산책 자원하기",
    "종이접기 배우기",
    "아이들과 같이 놀기",
    "족욕하기",
    "애완견센터에 가서 애견 구경하기",
    "저글링 배우기",
    "일광욕",
    "차 내부세차 하기",
    "벤치용 그네에 앉기",
    "콘서트 가기",
    "하이킹(도보 여행)",
    "명상",
    "뜨개질 배우기",
    "카드로 할 수 있는 게임하기",
    "낱말맞추기 게임",
    "지도책 보기",
    "아이스크림 파르페 사 먹기",
    "시골로 드라이브 계획",
    "주말농장 빌리기",
    "냅킨을 직접 만들어 보기",
    "뒷뜰에서 저녁 해 먹기",
    "피자를 만들어서 구워보기",
    "욕조에 촛불 켜 놓고 목욕하기",
    "요리책 사서 3가지 새로운 음식 시도하기",
    "친구와 공원으로 소풍",
    "소설책 읽기",
    "친구불러 티파티",
    "고등학교 때 애창곡 듣기",
    "새나 자연을 감상",
    "비디오 빌리고 팝콘 만들어서 친구부르기",
    "나무 밑에서 책 읽기",
    "지역 예술행사 참석",
    "사진, CD 분류 정리하기",
    "코미디클럽 가기",
    "시 쓰기",
    "북클럽에 참여",
    "합창단 가입",
    "아이들 방과 후 활동에 멘토로 참여",
    "숫자 퍼즐 게임 하기",
    "풀장/강가/해변가에 누워보기",
    "댄스복을 입고 거실에서 춤 춰 보기",
    "가까운 도시의 역사탐방 가기",
    "지역대학이나 센터에서 강좌 듣기",
    "옷을 잘 차려입고 친구 만나기",
    "스크랩북 만들기",
    "이웃과 바비큐파티",
    "여행가이드 북 읽기 또는 계획 잡기",
    "한 주 동안 날마다 사진찍기",
    "몸짓으로 낱말맞추기 게임",
    "포커 게임",
    "바다로 가기",
    "체육대회 참가",
    "동물원 가기",
    "탁구치기",
    "잡지 기사 쓰기",
    "보드게임 하러 친구부르기",
    "새로운 언어 배우기",
    "비디오게임 하기"
  ];


useEffect(() => {
  if (hasFetchedRef.current) return; // 이미 실행했으면 스킵
  hasFetchedRef.current = true;

  const getAdvice = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/action-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          worries,
          input,
          prompt: `다음 활동 목록 중에서 "${input}"이라는 고민에 도움이 될 만한 3가지 활동을 추천해줘. 구체적이고 실천 가능한 걸로.`,
          activityList
        })
      });

      const data = await response.json();
      setSummary(data.summary || "");
      const normalizedAdvice = Array.isArray(data.advice)
        ? data.advice
        : typeof data.advice === "string"
        ? [data.advice]
        : [];
      setAdviceList(normalizedAdvice);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdviceList(["추천을 가져오는 데 실패했습니다."]);
    } finally {
      setLoading(false);
    }
  };

  getAdvice();
}, []); // ✅ 의존성 배열도 빈 배열로 변경

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header title="앞으로의 행동 추천" setMenuOpen={setMenuOpen} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      <div style={{ padding: "1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ fontSize: "0.9rem", color: "#888", textAlign: "center" }}>
          AI가 추천하는 행동이므로 참고용입니다. <br />
          자세한 사항은 전문가와 상담을 추천드립니다.
        </p>
   {/* ✅ 상담 요약: 맨 위로 이동 */}
   <h3 style={{ textAlign: "center", marginTop: "1.2rem" }}>
          <span style={{ color: "#008BDB", fontWeight: "bold" }}>
            {name ? `‘${name}’님` : "당신"}에게
          </span>{" "}
          추천하는 다음 행동들:
        </h3>
  {!loading && summary && (
      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "1rem 1.2rem",
          borderRadius: "1rem",
          border: "1px solid #cce7f6",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          marginTop: "1rem",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
          color: "#333",
          position: "relative",
        }}
      >
        <div
          style={{
            content: "''",
            position: "absolute",
            top: "-10px",
            left: "20px",
            width: "0",
            height: "0",
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #f0f8ff"
          }}
        />
        🧠 <strong>상담 요약:</strong> {summary}
      </div>
    )}

  {!loading && adviceList.length > 0 && (
    <div style={{ marginTop: "1.5rem" }}>
    {adviceList.map((item, idx) => {
      const isChecked = checkedList.includes(idx);
      return (
        <div
          key={idx}
          onClick={() => {
            setCheckedList((prev) =>
              prev.includes(idx)
                ? prev.filter((i) => i !== idx)
                : [...prev, idx]
            );
          }}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: isChecked ? "#E6F4FF" : "#F9FAFB",
            border: `2px solid ${isChecked ? "#00AEEF" : "#eee"}`,
            borderRadius: "1rem",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            style={{
              marginRight: "1rem",
              accentColor: "#00AEEF",
              width: "1.2rem",
              height: "1.2rem"
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "0.95rem" }}>{item}</span>
        </div>
      );
    })}
  </div>
)}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
            type="button" // 꼭 추가!
            onClick={() => navigate("/reminder")}
            style={{
              backgroundColor: "#00AEEF",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "1rem",
              width: "100%",
              border: "none",
              borderRadius: "0.75rem"
            }}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}