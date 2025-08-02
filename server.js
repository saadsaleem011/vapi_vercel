import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Helper function to send errors in a safe format
const sendError = (res, status, message, error = null) => {
  console.error("❌ ERROR:", message, error || "");
  res.status(status).json({
    success: false,
    error: message,
    details: error ? String(error) : undefined,
  });
};

app.post("/start-workflow", async (req, res) => {
  try {
    // Check if env vars exist
    if (!process.env.VAPI_API_KEY || !process.env.WORKFLOW_ID) {
      return sendError(
        res,
        500,
        "Missing environment variables. Check VAPI_API_KEY and WORKFLOW_ID."
      );
    }

    // API request to Vapi
    const response = await fetch("https://api.vapi.ai/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflowId: process.env.WORKFLOW_ID,
        assistantId: process.env.ASSISTANT_ID || undefined, // optional
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return sendError(
        res,
        response.status,
        `Vapi API error: ${data.message || "Unknown error"}`,
        data
      );
    }

    res.json({
      success: true,
      message: "Workflow started successfully",
      data,
    });
  } catch (err) {
    return sendError(res, 500, "Server error while starting workflow", err);
  }
});

// Handle unknown routes
app.use((req, res) => {
  sendError(res, 404, "Route not found");
});

// Global error handler
app.use((err, req, res, next) => {
  sendError(res, 500, "Unexpected server error", err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
