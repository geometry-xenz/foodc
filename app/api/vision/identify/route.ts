import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/server/gemini";
import { Type } from "@google/genai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mimeType = "image/jpeg", notes } = body;

    if (!image) {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 });
    }

    // Strip data URL header if present
    const base64Data = image.includes("base64,") ? image.split("base64,")[1] : image;

    const promptText = `Analyze this food / kitchen / ingredient photo.
Identify all visible ingredients, culinary items, or spices with high precision.
For each item detected, provide:
1. name: standardized common culinary name (e.g. "turmeric", "tomato", "cumin", "chicken breast", "spinach")
2. displayName: readable title (e.g. "Turmeric Root / Powder", "Roma Tomato")
3. category: one of ["Produce", "Spices & Aromatics", "Proteins & Dairy", "Grains & Staples", "Oils & Condiments"]
4. confidence: float between 0.0 and 1.0 representing detection confidence
5. estimatedQuantityG: estimated weight in grams (e.g. 150 for an apple or onion)
6. freshness: assessment like "fresh", "ripe", "dry", or "pantry-stable"
7. primaryVolatiles: 2-4 key aromatic flavour compounds (e.g. for cumin: ["cuminaldehyde", "pinene", "cymene"])
8. boundingBox: normalized percentages { x, y, w, h } where 0-100 represents position in the image frame.

Also provide:
- generalAdvice: a 1-sentence culinary insight on how to best utilize these ingredients together.
${notes ? `User note: ${notes}` : ""}`;

    const candidateModels = [
      process.env.VISION_MODEL,
      "gemini-flash-lite-latest",
      "gemini-3.6-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash"
    ].filter(Boolean) as string[];

    let response: any = null;
    let usedModel = "";

    for (const m of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: m,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || "image/jpeg",
                  data: base64Data,
                },
              },
              { text: promptText },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      displayName: { type: Type.STRING },
                      category: { type: Type.STRING },
                      confidence: { type: Type.NUMBER },
                      estimatedQuantityG: { type: Type.NUMBER },
                      freshness: { type: Type.STRING },
                      primaryVolatiles: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      boundingBox: {
                        type: Type.OBJECT,
                        properties: {
                          x: { type: Type.NUMBER },
                          y: { type: Type.NUMBER },
                          w: { type: Type.NUMBER },
                          h: { type: Type.NUMBER },
                        },
                        required: ["x", "y", "w", "h"],
                      },
                    },
                    required: ["name", "displayName", "category", "confidence"],
                  },
                },
                generalAdvice: { type: Type.STRING },
              },
              required: ["items"],
            },
          },
        });
        if (response && response.text) {
          usedModel = m;
          break;
        }
      } catch (err) {
        console.warn(`[Gemini Vision] Model ${m} failed:`, err);
      }
    }

    if (!response || !response.text) {
      throw new Error("All candidate Gemini vision models failed or timed out.");
    }

    const parsed = JSON.parse(response.text || '{"items":[]}');
    return NextResponse.json({
      success: true,
      data: parsed,
      model: usedModel,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Vision identification error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to identify ingredients in image" },
      { status: 500 }
    );
  }
}
