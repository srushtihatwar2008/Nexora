# 🌾 AgriChain: Farm-to-Market Intelligence Platform

**Closing the 40% Gap in Indian Agriculture through AI-Driven Decisions.**

---

## 📌 Project Overview
In India, nearly **40% of agricultural produce** is lost post-harvest. This isn't due to poor farming, but due to **poor timing** and **market mismatch**. AgriChain is an AI-powered platform designed to provide small-scale farmers with actionable intelligence to decide exactly **when** to harvest and **where** to sell.

### The Problem
* **Harvest Timing:** Farmers often harvest based on intuition, missing the peak price or hitting bad weather.
* **Market Information:** Farmers lack data on which Mandi (market) will give them the best "Net Profit" after transport costs.
* **Spoilage:** High heat and poor logistics rot crops before they reach the consumer.

---

## 🚀 Key Features

### 1. 📅 Optimal Harvest Predictor
Analyzes real-time weather (IMD), satellite imagery (NDVI), and soil health to recommend a 7-day "Harvest Window." It tells the farmer to wait if rain is coming or if the crop hasn't reached peak maturity.

### 2. 💰 Smart Mandi Arbitrage
Calculates the **Net Realizable Value (NRV)**. It compares multiple markets, subtracts transport/fuel costs, and suggests the Mandi where the farmer keeps the most cash.

### 3. 📦 Spoilage Risk & Preservation
A "Freshness Countdown" that predicts crop decay based on humidity and transit time. It suggests ranked actions:
* **Low Cost:** Shade drying / Ventilated crates.
* **High Cost:** Cold storage (recommended only if price trends justify the investment).

### 4. 🧠 Explainable AI (XAI)
Designed for trust. The app doesn't just give an order; it explains **"Why"** (e.g., *"Wait 2 days because local prices always rise after the Tuesday glut"*).

---

## 📱 Tech Stack & Architecture

* **Frontend:** React Native / PWA (Optimized for basic Android phones).
* **Backend:** Python (FastAPI / Flask).
* **AI/ML:** * `Random Forest / LSTM` for Price Prediction.
    * `LLMs (GPT-4o / Llama)` for local language voice-to-text summaries.
* **Data Sources:** * **Weather:** OpenWeather / IMD API.
    * **Market Prices:** Agmarknet / Govt. Data Portals.
    * **Soil/Crop:** Sentinel-2 Satellite Imagery.

---

## 🎨 Design for Low Literacy
* **Icon-First UI:** Large buttons and color-coded alerts (Green/Yellow/Red).
* **Voice Support:** Audio recommendations in regional languages (Hindi, Marathi, etc.).
* **Offline Mode:** Works on 2G/3G speeds with SMS fallback for critical alerts.

---

## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/yourusername/AgriChain.git](https://github.com/yourusername/AgriChain.git)
