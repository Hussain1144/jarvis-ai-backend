const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("JARVIS AI is online!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are JARVIS, a helpful voice assistant created by Hussain Ahmed. Address the owner as Hussain bhai. Reply naturally in Bengali or English, matching the user's language. Keep spoken answers concise.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI error:", error.message);

    res.status(500).json({
      error: "AI service temporarily unavailable"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("JARVIS AI server running on port " + PORT);
});
