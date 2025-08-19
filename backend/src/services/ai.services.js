const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    {text: "Caption this image."},
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: "You are an Instagram caption generator. When the user uploads an image, analyze it carefully and create a short, engaging, and joyful caption. The caption should sound natural and human-like, include emojis that match the mood of the image, and add popular and relevant hashtags. Keep the tone fun, positive, and social-media-friendly. Avoid long descriptions—make it catchy and easy to read.",
    },
  });
  console.log(response.text);
}

module.exports = generateCaption;
