import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import economicIcon from "./assets/economic.png";
import healthIcon from "./assets/health.png";
import educationIcon from "./assets/education.png";
import relationshipIcon from "./assets/relationship.png";
import parentingIcon from "./assets/parenting.png";
import familyIcon from "./assets/family.png";
import workIcon from "./assets/work.png";
import spiritualityIcon from "./assets/spirituality.png";
import creationIcon from "./assets/creation.png";
import environmentIcon from "./assets/environment.png";
import socialIcon from "./assets/social.png";
import "./styles/MagicWandDescribe.css";
import "./styles/common.css";
import "./styles/Header.css";

const worryMap = {
  "경제적 문제": economicIcon,
  "건강": healthIcon,
  "학업·교육": educationIcon,
  "배우자·연인": relationshipIcon,
  "돌보기·자녀양육": parentingIcon,
  "가족 관계": familyIcon,
  "직장": workIcon,
  "영성": spiritualityIcon,
  "창조": creationIcon,
  "환경": environmentIcon,
  "사회적 책임": socialIcon
};

export default function MagicWandDescribe() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";
  const worries = location.state?.worries ?? [];

  return (
    <>
      <div className="common-root">
      <Header
        title="만약에 질문"
        onBack={() => navigate(-1)}
        onMenu={() => setMenuOpen(true)}  // ✅ 이 줄 추가!
      />
         {/* 햄버거 메뉴 */}
        {menuOpen && (
          <HamburgerMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            navigate={navigate}
          />
        )}
      </div>
      <div className="magicwand-desc-content">
        <p className="magicwand-desc-title">‘{name}’님의 고민거리</p>

        {worries.length > 0 ? (
          <p className="magicwand-desc-worries">
            ‘{worries.join("’, ‘")}’이 사라졌어요.
          </p>
        ) : (
          <p className="magicwand-desc-noworry">
            선택한 고민거리가 없어요.
          </p>
        )}

        {worries.length > 0 && (
          <div className="magicwand-desc-worrylist">
            {worries.map((worry) => (
              <div key={worry} className="magicwand-desc-worryitem">
                {worryMap[worry] && (
                  <img
                    src={worryMap[worry]}
                    alt={worry}
                    className="magicwand-desc-worryicon"
                  />
                )}
                <p className="magicwand-desc-worrylabel">{worry}</p>
              </div>
            ))}
          </div>
        )}

        <div className="magicwand-desc-inputwrap">
          <p className="magicwand-desc-inputlabel">
            그렇다면 현재 무엇을 가장 하고 싶은가요?
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            placeholder="내용 입력하기"
            className="magicwand-desc-textarea"
            style={{ boxSizing: "border-box", width: "100%", maxWidth: "100%" }}
          />
          <p className="magicwand-desc-count">{input.length}/1000</p>
        </div>
      </div>

      <div className="magicwand-desc-recommend">
        ✨ 어떤 행동을 하면 좋을지 추천해드릴까요? ✨
      </div>

      <div
        className="button-row"
        style={{
          boxSizing: "border-box",
          maxWidth: 500,
          margin: "0 auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem"
        }}
      >
        <button
          onClick={() =>
            navigate("/actionadvice", {
              state: { name, worries, input }
            })
          }
          className="cta-button"
        >
          행동 추천 받기
        </button>
      </div>
      <div style={{ height: "5rem" }} />
    </>
  );
}
