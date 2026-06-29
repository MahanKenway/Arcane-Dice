import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" })); // for image uploads

// 1. Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// --- API ENDPOINTS ---

// AI Explanation & Rule Assistant (Search Grounding & Standard inference)
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, useGrounding } = req.body;
    const tools = useGrounding ? [{ googleSearch: {} }] : undefined;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools,
      },
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// AI High Thinking for Complex Queries (e.g. converting actions to rolls)
app.post("/api/chat/think", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Think error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Image Generation
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, size } = req.body; // size: 1K, 2K, 4K
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image",
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size || "1K",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        return res.json({ imageUrl });
      }
    }
    res.status(500).json({ error: "Failed to generate image" });
  } catch (error: any) {
    console.error("Image gen error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Music Generation
app.post("/api/generate-music", async (req, res) => {
  try {
    const { prompt, fullLength } = req.body;
    const model = fullLength ? "lyria-3-pro-preview" : "lyria-3-clip-preview";

    const responseStream = await ai.models.generateContentStream({
      model,
      contents: prompt,
    });

    let audioBase64 = "";
    let mimeType = "audio/wav";

    for await (const chunk of responseStream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
      }
    }

    if (!audioBase64) {
      return res.status(500).json({ error: "No audio generated" });
    }

    res.json({ audioBase64, mimeType });
  } catch (error: any) {
    console.error("Music gen error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Video Generation (Start)
app.post("/api/generate-video", async (req, res) => {
  try {
    const { prompt, imageBytes } = req.body;
    
    const payload: any = {
      model: "veo-3.1-fast-generate-preview",
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: "16:9",
      },
    };
    
    if (imageBytes) {
      payload.image = {
        imageBytes,
        mimeType: "image/png"
      };
    }

    const operation = await ai.models.generateVideos(payload);
    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error("Video gen error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Video Status (Poll)
app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: updated.done });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Video Download
app.post("/api/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: "Video URI not found yet." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY || "" },
    });
    
    res.setHeader("Content-Type", "video/mp4");
    if (videoRes.body) {
      // Need to convert web ReadableStream to Node stream or handle chunks
      const reader = videoRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.status(500).json({ error: "No video body" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
