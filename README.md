# StaTic NeuraL — Multilingual Voice AI Agent

Real-time voice AI pipeline: **WebRTC audio → Sarvam STT → Groq LLM → ElevenLabs / Sarvam TTS → speaker**, optimized for Indian languages and Hinglish.

## Architecture

```
Browser (WebRTC) ──→ LiveKit Server ──→ LiveKit Agent
                                         ├─ STT: Sarvam Saaras v3 (22 Indian languages)
                                         ├─ LLM: Llama 3.1-70B via Groq (<300ms)
                                         └─ TTS: ElevenLabs Multilingual v2 / Sarvam Bulbul
```

## Quick Start

### 1. Install dependencies

```bash
pip install -e .
```

### 2. Configure API keys

```bash
cp .env.example .env
# Edit .env with your keys:
#   LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
#   SARVAM_API_KEY
#   GROQ_API_KEY
#   ELEVENLABS_API_KEY
```

### 3. Start the voice agent

```bash
python agent/agent.py dev
```

### 4. Start the token server

```bash
python server.py
```

### 5. Open the frontend

```bash
python -m http.server 3000 --directory frontend
# Open http://localhost:3000
```

## Project Structure

```
├── agent/
│   ├── agent.py         # Main voice pipeline (STT → LLM → TTS)
│   ├── stt_sarvam.py    # Sarvam Saaras STT plugin for LiveKit
│   ├── tts_sarvam.py    # Sarvam Bulbul TTS plugin for LiveKit
│   └── __init__.py
├── frontend/
│   ├── index.html       # Voice UI (dark-mode glassmorphism)
│   ├── style.css        # Styles with animations
│   └── app.js           # LiveKit WebRTC client logic
├── server.py            # Flask token server
├── pyproject.toml       # Python dependencies
├── .env.example         # API key template
└── README.md
```

## Supported Languages

Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Punjabi, Odia, English (India), and Hinglish (code-mixed).

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Orchestration | LiveKit Agents | WebRTC audio transport + pipeline |
| STT | Sarvam AI Saaras v3 | Indian language speech recognition |
| LLM | Llama 3.1-70B via Groq | Ultra-fast inference (<300ms) |
| TTS | ElevenLabs / Sarvam Bulbul | Emotional prosody, multilingual |
| VAD | Silero | Voice Activity Detection |
| Frontend | Vanilla HTML/CSS/JS | LiveKit client SDK |