import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client with aistudio-build telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// -------------------------------------------------------------------
// API ROUTE: Structural AI Executive Engineering Advisory
// -------------------------------------------------------------------
app.post('/api/gemini/advisory', async (req: Request, res: Response) => {
  try {
    const { params, deterministic } = req.body;

    if (!params) {
      res.status(400).json({ error: 'Missing structural parameters' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback to deterministic advisory if key not present
      res.json({
        ar: deterministic?.advisoryTextAr || '',
        en: deterministic?.advisoryTextEn || '',
        source: 'deterministic',
      });
      return;
    }

    const prompt = `You are the Chief Structural Engineer at RIVA, an Egyptian deep-tech NDT radar company.
Generate a concise, authoritative 2-sentence executive advisory for a concrete infrastructure client.
Structure Type: ${params.structureType}, Length: ${params.length}m, Width: ${params.width}m, Depth: ${params.depth}cm, Age: ${params.ageYears} years, Environment Exposure: ${params.exposure}.
Compliance Standards: Egyptian Concrete Practice (ECP 203) and De Sitter's Law of Fives.
Provide your response strictly as JSON with keys "ar" (in Arabic) and "en" (in English).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response.text) {
      try {
        const parsed = JSON.parse(response.text);
        if (parsed.ar && parsed.en) {
          res.json({ ar: parsed.ar, en: parsed.en, source: 'gemini' });
          return;
        }
      } catch (parseErr) {
        console.warn('Failed to parse Gemini response as JSON', parseErr);
      }
    }

    res.json({
      ar: deterministic?.advisoryTextAr || '',
      en: deterministic?.advisoryTextEn || '',
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('Server Gemini advisory error:', error);
    res.json({
      ar: req.body?.deterministic?.advisoryTextAr || '',
      en: req.body?.deterministic?.advisoryTextEn || '',
      source: 'fallback',
      error: error?.message || 'Server-side Gemini call failed',
    });
  }
});

// -------------------------------------------------------------------
// API ROUTE: General Gemini Text Generation
// -------------------------------------------------------------------
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini generate error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate content' });
  }
});

// -------------------------------------------------------------------
// API ROUTE: Streaming Content via Server-Sent Events (SSE)
// -------------------------------------------------------------------
app.post('/api/gemini/stream', async (req: Request, res: Response) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Gemini streaming error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || 'Streaming failed' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || 'Streaming error' })}\n\n`);
      res.end();
    }
  }
});

// -------------------------------------------------------------------
// Vite Middleware (Dev) vs Static Files (Prod)
// -------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`RIVA NDT Server running on port ${PORT} (isProd: ${isProd})`);
  });
}

startServer();
