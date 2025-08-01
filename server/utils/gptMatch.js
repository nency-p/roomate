// utils/gptMatch.js
require("dotenv").config();
const axios = require("axios");

async function getMatchFromGPT(newUser, otherUsers) {

  const prompt = `
You are a roommate-matching AI. Compare one new user to a list of previous users based on their lifestyle and preferences.

Match on:
- Sleep Schedule
- Cleanliness
- Stress Management
- Guest Policy
- Downtime Style


New User:
${JSON.stringify(newUser, null, 2)}

Other Users:
${JSON.stringify(otherUsers, null, 2)}

👉🏽 Your task:
- Pick the most compatible match.
- Score the match from 0 to 100.
- Give a one-line reason.
- RETURN ONLY VALID JSON like this (no explanations):

{
  "matchName": "Full Name",
  "score": 85,
  "reason": "Both prefer quiet evenings, medium cleanliness, and flexible habits."
}

🚫 Do not add anything outside the JSON. Just return the object above.
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

// Extract JSON using regex
const jsonMatch = content.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("GPT response did not include valid JSON");


const matchData = JSON.parse(jsonMatch[0]);

// Clamp score to valid range
matchData.score = Math.max(0, Math.min(matchData.score, 100));
return matchData;


  } catch (err) {
    console.error("Error from GPT:", err.response?.data || err.message);
    throw new Error("Failed to get match from GPT");
  }
}

module.exports = getMatchFromGPT;
