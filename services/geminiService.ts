import { GoogleGenAI, Type } from "@google/genai";
import { AVAILABLE_CHORDS } from '../constants';

const apiKey = process.env.API_KEY || '';

// System instruction to ensure the model behaves as a music theory expert
const SYSTEM_INSTRUCTION = `You are an expert music composer and theorist. 
Your task is to generate 4-chord progressions based on a user's requested mood or style.
You must ONLY use chords from the following list: ${AVAILABLE_CHORDS.join(', ')}.
If a requested mood implies a chord not in the list, substitute it with the best available alternative from the list.
Ensure the progression is musically coherent.`;

export const generateProgression = async (mood: string): Promise<string[]> => {
  if (!apiKey) {
    console.error("API Key not found");
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 4-chord progression for a "${mood}" vibe.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            chords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of exactly 4 chord names from the allowed list."
            },
            description: {
              type: Type.STRING,
              description: "A very brief explanation of why these chords fit the mood."
            }
          },
          required: ["chords"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    // Validate chords against library to be safe
    const validChords = data.chords.map((c: string) => {
        // Simple fuzzy match or fallback
        if (AVAILABLE_CHORDS.includes(c)) return c;
        // Try to find a close match or default to C Maj
        const match = AVAILABLE_CHORDS.find(ac => ac.toLowerCase() === c.toLowerCase());
        return match || "C Maj";
    });

    // Ensure strictly 4 chords
    while (validChords.length < 4) validChords.push("C Maj");
    return validChords.slice(0, 4);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of error
    return ["C Maj", "G Maj", "A Min", "F Maj"];
  }
};
