import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/start-workflow", async (req, res) => {
  try {
    const response = await fetch("https://api.vapi.ai/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: process.env.ASSISTANT_ID,
        workflowId: process.env.WORKFLOW_ID,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error starting workflow:", err);
    res.status(500).json({ error: "Failed to start workflow" });
  }
});

app.listen(3000, () => console.log("✅ Server running on port 3000")); 