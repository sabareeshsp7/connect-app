import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("AI Chat API called");
    const { message } = await req.json();
    console.log("Received message:", message);

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    console.log("API key found (length:", apiKey.length, "), making direct API call...");

    // Make direct API call to Google's Generative AI using v1 API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

    console.log("Response generated successfully");
    return NextResponse.json({ response: generatedText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
