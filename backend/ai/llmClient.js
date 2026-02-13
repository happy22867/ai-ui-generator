require("dotenv").config();
const axios = require("axios");

async function callLLM(prompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Return only valid JSON. No markdown, no explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    let content = response.data.choices[0].message.content.trim();
    console.log("Raw AI Response:", content);
    
    // Clean markdown if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    
    // Extract JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!parsed.components || !Array.isArray(parsed.components)) {
      throw new Error("Invalid response structure");
    }

    return parsed;

  } catch (error) {
    console.error("AI Error:", error.message);
    
    // Return fallback
    return {
      components: [{
        type: "Card",
        props: { title: "Error", content: "AI failed to generate UI" }
      }]
    };
  }
}

module.exports = { callLLM };