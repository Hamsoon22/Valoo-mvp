import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch, { Headers } from "node-fetch";
import { OpenAI } from "openai";

dotenv.config();

// 글로벌 등록
globalThis.fetch = fetch;
globalThis.Headers = Headers;

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch,
});

app.post("/api/action-advice", async (req, res) => {
  const { worries, input, prompt, activityList } = req.body;

  if (!activityList || !Array.isArray(activityList) || activityList.length < 2) {
    return res.status(400).json({ error: "2개 이상의 활동 목록(activityList)이 필요합니다." });
  }

  try {
    // 1. GPT에게 상담 요약 + 추천 활동 1가지 요청
    const gptPrompt = `
      "${input}"이라는 고민에 대해 먼저 한 문장으로 간단한 상담 요약을 해주고,
      그 다음 아래 활동 목록 중에서 고민에 어울리는 하나를 골라,
      말끝을 "00하는 건 어때요?", "시작해보는 것도 좋겠어요" 등 **제안형 문장**으로 바꿔서 말해주세요.

      ❗️형식은 꼭 지켜주세요:
      상담 요약: (한 문장)
      추천 활동: (자연스럽고 부드러운 제안형 문장 1개)

      예시:
      상담 요약: 당신은 지금 무기력함에서 벗어날 작은 계기가 필요해 보여요.
      추천 활동: 카페에서 커피를 마시며 가볍게 하루를 시작해보는 건 어때요?

      [활동 목록]
      ${activityList.join("\n")}
      `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "고민에 대해 짧은 상담 요약을 제공하고, 활동 목록 중 하나를 추천하는 전문가입니다."
        },
        { role: "user", content: gptPrompt + `\n\n[활동 목록]\n${activityList.join("\n")}` }
      ]
    });

    const content = completion.choices[0].message.content.trim();

    // 2. 응답 파싱
    const summaryMatch = content.match(/상담\s*요약[:：]\s*(.+)/i);
    const activityMatch = content.match(/추천\s*활동[:：]\s*(.+)/i);

    const summary = summaryMatch ? summaryMatch[1].trim() : "당신에게 필요한 것을 파악 중입니다.";
    const gptSuggestion = activityMatch ? activityMatch[1].trim() : null;

    // 3. activityList에서 GPT 추천 제외 후 2개 랜덤 추천
    const filteredList = gptSuggestion
      ? activityList.filter((act) => act !== gptSuggestion)
      : activityList;

    const shuffled = filteredList.sort(() => 0.5 - Math.random());
    const randomTwo = shuffled.slice(0, 2);

    const advice = gptSuggestion ? [gptSuggestion, ...randomTwo] : randomTwo;

    res.json({ summary, advice });
  } catch (error) {
    console.error("Error generating advice:", error);
    res.status(500).json({ error: "Failed to generate advice" });
  }
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});