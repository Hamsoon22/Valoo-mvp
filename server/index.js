import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch, { Headers } from "node-fetch"; // ✔️ Headers도 같이 import
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
  const { worries, input } = req.body;

  try {
    const prompt = `다음 고민에 대한 조언을 해주세요:\n고민: ${worries.join(", ")}\n현재 상태: ${input}`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const advice = completion.choices[0].message.content;
    res.json({ advice });
  } catch (error) {
    console.error("Error generating advice:", error);
    res.status(500).json({ error: "Failed to generate advice" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
