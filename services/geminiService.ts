
import { GoogleGenAI } from "@google/genai";

export const generateHairstylePreview = async (
  personImageBase64: string,
  styleImageBase64: string,
  description: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // Clean base64 strings (remove data:image/xxx;base64, prefix)
  const cleanPersonBase64 = personImageBase64.split(',')[1];
  const cleanStyleBase64 = styleImageBase64.split(',')[1];

  const personPart = {
    inlineData: {
      data: cleanPersonBase64,
      mimeType: "image/png",
    },
  };

  const stylePart = {
    inlineData: {
      data: cleanStyleBase64,
      mimeType: "image/png",
    },
  };

  const prompt = `
    Instructions for Genesis Beauty Salon Visualizer:
    1. The first image is the client's face.
    2. The second image is the desired hairstyle.
    3. Additional client notes: "${description || 'None'}"
    
    TASK: Generate a high-quality, realistic image of the person in the first image wearing the exact hairstyle shown in the second image. 
    Maintain the facial identity, skin tone, and features of the person from the first image perfectly. 
    Blend the hair seamlessly. If the description mentions color adjustments or length tweaks, follow them.
    Output ONLY the resulting image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        personPart,
        stylePart,
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from Gemini API");
};
