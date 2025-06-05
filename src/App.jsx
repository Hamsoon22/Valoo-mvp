// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./SplashPage";
import OnboardingPage from "./OnboardingPage";
import ConsentPage from "./ConsentPage";
import ModeSelectionFlow from "./ModeSelectionFlow";
import ValueIntro from "./ValueIntro";
import UserInfoPage from "./UserInfoPage";
import NextStepChoicePage from "./NextStepChoicePage";
// import GuideVideoPage from "./GuideVideoPage";
import JournalActivityPage from "./JournalActivityPage";
import MagicWandPage from "./MagicWandPage";
import SurveyFlow from "./SurveyFlow"; // ← 기존 step 방식은 별도로 분리
import ResultPage from "./ResultPage";
import MagicWandSplash from "./MagicWandSplash";
import MagicWandDescribe from "./MagicWandDescribe";
import ActionAdvice from "./ActionAdvice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/modeselection" element={<ModeSelectionFlow />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
        <Route path="/valueintro" element={<ValueIntro />} />
        {/* <Route path="/guidevideo" element={<GuideVideoPage />} /> */}
        <Route path="/result" element={<ResultPage/>} />
        <Route path="/stepselection" element={<NextStepChoicePage />} />
        <Route path="/journal" element={<JournalActivityPage />} />
        <Route path="/magicwand" element={<MagicWandPage />} />
        <Route path="/magicwandsplash" element={<MagicWandSplash />} />
        <Route path="/magicwandescribe" element={<MagicWandDescribe />} />
        <Route path="/actionadvice" element={<ActionAdvice />} />
        <Route path="/survey" element={<SurveyFlow />} /> {/* ← 이 안에 step 로직 넣기 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
