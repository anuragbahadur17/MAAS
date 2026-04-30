import { NextRequest, NextResponse } from "next/server";

const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

function getNextKey(): string | null {
  if (GEMINI_KEYS.length === 0) return null;
  const key = GEMINI_KEYS[currentKeyIndex % GEMINI_KEYS.length];
  currentKeyIndex++;
  return key;
}

const requestCounts = new Map<string, { count: number; time: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);
  if (!userRequests) { requestCounts.set(ip, { count: 1, time: now }); return true; }
  if (now - userRequests.time > 60000) { requestCounts.set(ip, { count: 1, time: now }); return true; }
  if (userRequests.count >= 15) return false;
  requestCounts.set(ip, { count: userRequests.count + 1, time: userRequests.time });
  return true;
}

async function tryGemini(prompt: string): Promise<string | null> {
  for (let attempt = 0; attempt < GEMINI_KEYS.length; attempt++) {
    const key = getNextKey();
    if (!key) continue;
    try {
      console.log(`Trying Gemini key ${attempt + 1}...`);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 2000, temperature: 0.7 }
          }),
        }
      );
      const data = await res.json();
      if (res.status === 429) {
        console.log(`Key ${attempt + 1} quota exceeded — trying next key...`);
        continue;
      }
      if (!res.ok) {
        console.error(`Key ${attempt + 1} error:`, data?.error?.message);
        continue;
      }
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        console.log(`✅ Gemini key ${attempt + 1} success!`);
        return text;
      }
    } catch (error) {
      console.error(`Key ${attempt + 1} failed:`, error);
      continue;
    }
  }
  console.error("All Gemini keys exhausted!");
  return null;
}

async function tryGroq(prompt: string): Promise<string | null> {
  try {
    const key = process.env.GROQ_API_KEY;
    if (!key) return null;
    console.log("Trying Groq backup...");
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      }),
    });
    const data = await res.json();
    console.log("Groq status:", res.status);
    if (!res.ok) {
      console.error("Groq error:", data?.error?.message);
      return null;
    }
    return data?.choices?.[0]?.message?.content || null;
  } catch { return null; }
}

async function tryClaude(prompt: string): Promise<string | null> {
  try {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return null;
    console.log("Trying Claude backup...");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      }),
    });
    const data = await res.json();
    console.log("Claude status:", res.status);
    return data?.content?.[0]?.text || null;
  } catch { return null; }
}

async function getYouTubeVideos(query: string) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=3&type=video&key=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.error || !data.items) return [];
    return data.items.map((item: { snippet: { title: string }; id: { videoId: string } }) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
    }));
  } catch { return []; }
}

function parseNotes(rawNotes: string | null): { tag: string; text: string }[] {
  if (!rawNotes) return [];
  try {
    const cleaned = rawNotes.replace(/```json/gi, '').replace(/```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) return [];
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (Array.isArray(parsed.notes) && parsed.notes.length > 0) return parsed.notes;
    return [];
  } catch { return []; }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({
      result: "Thoda ruko! 1 minute mein 15 se zyada requests nahi kar sakte. 🙏",
      ai_used: "none"
    });
  }

  const body = await req.json();
  const { prompt, mode } = body;

  if (!prompt || prompt.length < 3) {
    return NextResponse.json({ result: "Kuch meaningful likho 😊", ai_used: "none" });
  }

  if (mode === "student") {
    const aiPrompt = `Create study notes on: "${prompt}"
Return ONLY this JSON (no extra text, no backticks, no markdown):
{"notes":[{"tag":"Introduction","text":"2-3 line intro yahan likho"},{"tag":"Key Concepts","text":"key concepts yahan likho"},{"tag":"Important Points","text":"important points yahan likho"},{"tag":"Formula or Tip","text":"formula ya tip yahan likho"},{"tag":"Exam Tips","text":"exam tips yahan likho"}]}`;

    let rawNotes = await tryGemini(aiPrompt);
    let ai_used = "gemini";
    if (!rawNotes) { rawNotes = await tryGroq(aiPrompt); ai_used = "groq"; }
    if (!rawNotes) { rawNotes = await tryClaude(aiPrompt); ai_used = "claude"; }

    const videos = await getYouTubeVideos(`${prompt} explained in Hindi`);
    let notes = parseNotes(rawNotes);
    if (notes.length === 0) {
      notes = [{ tag: "Notes", text: rawNotes || "Notes generate nahi huye. Dobara try karo." }];
    }
    return NextResponse.json({ notes, videos, ai_used });
  }

  let result = await tryGemini(prompt);
  let ai_used = "gemini";
  if (!result) { result = await tryGroq(prompt); ai_used = "groq"; }
  if (!result) { result = await tryClaude(prompt); ai_used = "claude"; }

  if (!result) {
    return NextResponse.json({
      result: "AI busy hai, thodi der baad try karo 🙏",
      ai_used: "none"
    });
  }

  const videos = await getYouTubeVideos(prompt);
  return NextResponse.json({ notes: result, result, videos, ai_used });
}