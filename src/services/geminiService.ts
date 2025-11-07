import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// (تم الإصلاح) قراءة المفتاح بالطريقة الصحيحة الخاصة بـ Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// (تم التحديث) استخدام الطريقة الحديثة لتهيئة الـ SDK
const genAI = new GoogleGenerativeAI(API_KEY);

// (تم الإصلاح) استخدام اسم نموذج صالح وسريع
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-latest" 
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
};

// إعدادات الأمان (اختياري لكن موصى به)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function generateStory(idea: string, style: string): Promise<string> {
  try {
    // البرومبت الرائع الخاص بك يبقى كما هو
    const prompt = `
      You are an expert scriptwriter for short-form vertical videos (like Instagram Reels or TikTok).
      Your task is to generate a compelling and engaging video script based on the user's idea and desired style.
      The script should be concise, visually driven, and formatted clearly.

      **User's Idea:** "${idea}"
      **Desired Style/Tone:** "${style}"

      **Instructions:**
      1.  **Structure:** The script should have 3 to 5 scenes.
      2.  **Formatting:** For each scene, provide:
          -   **SCENE [Number]:** (A brief, descriptive title for the scene)
          -   **VISUAL:** A clear description of what is happening on screen.
          -   **AUDIO/VOICEOVER:** The dialogue, voiceover, or key sound effects.
      3.  **Content:** The script should be creative, match the requested tone, and be suitable for a video under 60 seconds. Keep descriptions punchy.

      Generate the script now.
    `;

    // (تم التحديث) استخدام الطريقة الحديثة لاستدعاء النموذج
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    return response.text();

  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    // معالجة الأخطاء تبقى كما هي
    throw new Error("Failed to generate story. Please try again.");
  }
}
