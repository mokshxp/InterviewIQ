require('dotenv').config({ path: __dirname + '/.env' });
const { GoogleGenAI } = require('@google/genai');
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const requestBody = {
    model: 'gemini-1.5-flash',
    contents: 'Hello',
    config: { systemInstruction: "Respond in JSON" }
};

client.models.generateContent(requestBody)
    .then(res => console.log("SUCCESS:", res.text().substring(0, 10)))
    .catch(err => console.error("API ERROR:", err.message));
