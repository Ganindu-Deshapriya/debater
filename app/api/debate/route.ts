import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the SDK. It automatically uses process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const { personalityPrompt, debateTopic, chatHistory, tone, conclusion } = body;

    let fullPrompt = '';
    if (conclusion) {
      fullPrompt = `
        You are a neutral debate judge.
        Topic: ${debateTopic}
        Here is the full debate transcript:
        ${chatHistory}
        Please provide a fair, concise summary and conclusion to this debate in 2-4 sentences. State a clear winner as well.
      `;
    } else {
      fullPrompt = `
        System Instruction: ${personalityPrompt}
        Debate Topic: ${debateTopic}
        Tone: ${tone}
        Recent Chat History:
        ${chatHistory}
        Respond in character, using the specified tone. Keep it under 3 sentences.
      `;
    }


    
    const modelName = process.env.GEMINI_MODEL_NAME;
    if (!modelName) {
      throw new Error('GEMINI_MODEL_NAME environment variable is required');
    }

    // Call the AI model
    const response = await ai.models.generateContent({
      model: modelName,
      contents: fullPrompt,
    });

    return NextResponse.json({ text: response.text });

  } catch (error: any) {
    // Log to the server terminal
    console.error("🔥 Error calling Gemini API:", error);
    
    // Send the exact error back to the frontend so you can see it in the browser!
    return NextResponse.json(
      { 
        error: "Failed to generate response", 
        details: error.message || String(error) 
      }, 
      { status: 500 }
    );
  }
}