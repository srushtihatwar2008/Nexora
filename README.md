# Earthworm - A Friend of Farmer

## 📱 Overview

Earthworm is a farmer-friendly AI-powered website designed for small and marginal Indian farmers using basic Android smartphones. It helps farmers make data-driven decisions about:

1. **🌾 Best Harvest Time** - When to harvest for maximum yield and quality
2. **🏪 Best Market** - Which mandi to sell at for maximum profit
3. **🧊 Storage & Spoilage Prevention** - How to keep produce fresh and prevent losses

## 🎯 Key Features

### User-Centric Design
- **Extremely Simple Interface** - Large buttons, minimal text
- **Visual Icons** - Emoji-based visual indicators instead of complex charts
- **Color-Coded Recommendations** - Green (Safe), Yellow (Risk), Red (High Risk)
- **Large, Readable Fonts** - Optimized for all ages and vision levels
- **Language Support** - Hindi and English with one-click toggle

### Trust & Transparency
- **Explainability Panels** - Shows WHY every recommendation is given
- **Data Sources** - Clearly tagged (Weather Data, Mandi Price Data, Historical Data)
- **Confidence Scores** - Shows reliability percentage of each recommendation
- **Risk Calculation Logic** - Explains the math behind risk assessment
- **No Hidden Algorithms** - Simple, understandable reasoning

### Technical
- **Offline-Friendly** - Demo data works without internet
- **Mobile-Optimized** - Perfect for low-end Android phones
- **No Dependencies** - Vanilla HTML/CSS/JavaScript only
- **Fast Loading** - Lightweight, optimized for slow connections
- **Voice Input Ready** - Voice option included (works on supported browsers)

## 📁 Project Structure

```
earthworm/
├── index.html              # Home page
├── harvest.html            # Harvest advice page
├── market.html             # Best market finder page
├── spoilage.html           # Storage & spoilage analysis page
├── css/
│   └── style.css          # Complete styling (rural-friendly theme)
├── js/
│   ├── data.js            # Demo data and calculation functions
│   ├── utils.js           # Utility functions (language, voice, storage)
│   └── main.js            # Page logic and event handling
└── README.md              # This file
```

## 🚀 How to Use

### 1. **Home Page (index.html)**
   - Welcome screen with language switcher
   - 3 large action buttons to choose service
   - Information about how Earthworm works
   - Trust features explanation
   - Current weather and market updates

### 2. **Harvest Advice (harvest.html)**
   - **Inputs:**
     - Crop Type (dropdown with 8 major crops)
     - Sowing Date
     - Location
   - **Outputs:**
     - Optimal harvest date
     - Days remaining
     - Weather risk assessment
     - Price trend (up/down/stable)
     - "Why this advice?" expandable section
     - Data sources and confidence score

### 3. **Best Market (market.html)**
   - **Inputs:**
     - Crop Type
     - Your Location
   - **Outputs:**
     - Top 3 mandis ranked by profit
     - Distance from your location
     - Current price
     - Transport time
     - Transport cost
     - **Net profit calculation** (price - cost - spoilage loss)
     - Explanation of why each mandi is ranked

### 4. **Storage & Spoilage (spoilage.html)**
   - **Inputs:**
     - Storage type (field, home, warehouse, cold storage)
     - Expected transport time
     - Expected temperature
   - **Outputs:**
     - Spoilage risk percentage + level
     - 4 ranked preservation suggestions:
       1. Ventilated Crates (Low Cost, Medium Impact)
       2. Night Transport (Zero Cost, High Impact)
       3. Cold Storage (High Cost, Very High Impact)
       4. Processing/Drying (Medium Cost, High Impact)
     - Each suggestion includes cost, impact, steps, and explanation

## 🎨 Design Philosophy

### Color Palette
- **Primary Green (#2d5016)** - Trust, growth, agriculture
- **Light Green (#4a7c2f)** - Secondary action
- **Accent Green (#89c540)** - Highlights, CTAs
- **Earth Brown (#8b6f47)** - Warmth, authenticity
- **Light Brown (#d4c4b0)** - Secondary
- **Risk Colors:**
  - Green (#27ae60) - Safe/Low Risk
  - Yellow (#f5b041) - Moderate Risk/Warning
  - Red (#d84a4a) - High Risk

### Typography
- System fonts for maximum compatibility
- Minimum 16px for body text
- Bold labels for clarity
- Line height 1.6+ for readability

### Visual Style
- Rounded corners (8-15px) - Friendly, approachable
- Soft shadows for depth
- Cards for information grouping
- Large emojis for visual clarity
- Smooth transitions (0.3s)

## 📊 Demo Data Included

The system includes demo data for:

### 8 Major Crops
- Wheat (गेहूं)
- Rice (धान)
- Cotton (कपास)
- Sugarcane (गन्ना)
- Potato (आलू)
- Onion (प्याज)
- Tomato (टमाटर)
- Soybean (सोयाबीन)

### Harvest Windows
Each crop includes:
- Typical sowing date
- Harvest start/end dates
- Optimal harvest day
- Days to maturity
- Weather risk assessment
- Risk description with actionable advice

### Market Data (Mandis)
3 sample mandis with:
- Name and location
- Distance from farmer
- Current price
- Transport time
- Transport cost
- Demand level

### Preservation Methods
4 ranked suggestions:
1. Cost (Low/Medium/High)
2. Impact effectiveness
3. Detailed description
4. Step-by-step instructions

## 🔧 Key Functions

### Data Functions (js/data.js)
- `calculateDaysToHarvest()` - Days remaining until optimal harvest
- `calculateSpoilageRisk()` - Risk percentage based on conditions
- `getBestMarkets()` - Rank mandis by profit
- `getSpoilageAnalysis()` - Full spoilage analysis with suggestions
- `getConfidenceScore()` - Reliability scoring

### Utility Functions (js/utils.js)
- `setLanguage() / getLanguage()` - Language management
- `initializeVoiceInput() / startVoiceInput()` - Voice features
- `getCurrentLocation()` - Location detection
- `saveToDraft() / loadFromDraft()` - Local storage management
- `validateForm()` - Form validation
- `showNotification()` - User feedback

### UI Functions (js/main.js)
- `displayHarvestAdvice()` - Render harvest recommendations
- `displayMarketAdvice()` - Render market comparison
- `displaySpoilageAnalysis()` - Render spoilage analysis
- `toggleExpand()` - Expand/collapse sections

## 🎯 Translation System

Simple i18n system for English and Hindi:
- Language stored in `localStorage`
- `t()` function for direct translations
- `getTranslation()` function for UI strings
- Supports simple objects: `{ en: "...", hi: "..." }`

## 💾 Local Storage

Saves draft entries for:
- `earthworm_harvest` - Harvest form data
- `earthworm_market` - Market form data
- `earthworm_spoilage` - Spoilage form data
- `earthworm_lang` - Selected language

## 🔄 Integration with Real Data

To connect to real AI/ML and live data:

### 1. Weather Data Integration
Replace in `getHarvestAdvice()`:
```javascript
// Current: Static data
// Replace with: API call to weather service
const weatherData = await fetch('https://api.weather.com/...');
```

### 2. Market Price Data
Replace in `getBestMarkets()`:
```javascript
// Current: Mock data
// Replace with: API call to mandi prices
const marketData = await fetch('https://mandi-api.gov.in/...');
```

### 3. AI/ML Model Integration
Create `getAIRecommendation()`:
```javascript
// Send input to ML backend
const recommendation = await fetch('https://earthworm-ml.api/predict', {
  method: 'POST',
  body: JSON.stringify({ crop, soilData, weather })
});
```

## 📱 Mobile Optimization

- **Responsive Design** - Works on 320px to 2560px screens
- **Touch-Friendly** - 44x44px minimum tap targets
- **Optimized Fonts** - System fonts load instantly
- **Light CSS** - No framework bloat
- **Fast Performance** - No JavaScript frameworks

## ♿ Accessibility

- ✓ Color contrast ratios 4.5:1+
- ✓ Large fonts (16px+)
- ✓ Clear labels and descriptions
- ✓ Keyboard navigation support
- ✓ Simple, clear language
- ✓ Voice input option
- ✓ Print-friendly styles

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 4 pages load correctly
- [ ] Form validation works
- [ ] Language toggle switches correctly
- [ ] Voice button appears (if supported)
- [ ] Results display with proper formatting
- [ ] Expandable sections work
- [ ] Links navigate correctly
- [ ] Mobile responsiveness (test on 320px)
- [ ] Offline mode works with demo data
- [ ] Print layout is clean

### Sample Test Data

**Crop:** Wheat
**Sowing Date:** 2025-10-15
**Location:** Delhi
**Storage Type:** Home
**Transport Time:** 2 hours
**Temperature:** 25°C

Expected: Harvest advice for March 25, Delhi mandi comparison, 25-30% spoilage risk.

## 🚀 Deployment

### For Local Testing
1. Open `index.html` in any modern browser
2. No server required (fully client-side)
3. All demo data included

### For Production Deployment
1. Upload files to web server
2. Configure with real API endpoints
3. Enable HTTPS for data security
4. Set up caching for offline support (Service Workers)

### Docker Deployment Example
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## 🔐 Security & Privacy

- All calculations done client-side
- No personal data transmitted
- No tracking or analytics
- Open-source friendly
- GDPR compliant (no data collection)

## 📝 Future Enhancements

1. **AI/ML Integration:** Real confidence from trained models
2. **Live Market Data:** Real-time mandi prices via government APIs
3. **Weather APIs:** Integration with IMD (India Meteorological Department)
4. **Soil Testing:** Soil quality recommendations
5. **Crop Disease Detection:** Image-based disease identification
6. **Farmer Community:** Peer-to-peer advice and price sharing
7. **Insurance Integration:** Link to crop insurance products
8. **Multi-State Support:** Expand to all Indian states
9. **Input Suggestion:** When/how much fertilizer, water, pesticide
10. **Historical Analytics:** See your own past recommendations vs actual results

## 👥 Target Users

- **Small Farmers:** 1-5 acres
- **Marginal Farmers:** <1 acre
- **Low Digital Literacy:** Basic phone users
- **Language:** Hindi & English speakers in India
- **Device:** Basic Android phones (Android 5.0+)
- **Connection:** May be offline for periods

## 📧 Support & Feedback

For issues, suggestions, or to contribute:
- Test the demo thoroughly
- Check console for errors
- Verify demo data loads
- Test on actual target devices
- Provide feedback on clarity of recommendations

---

**Version:** 1.0 Demo  
**Last Updated:** February 2026  
**Status:** Ready for Integration

Make farming smarter. Make decisions clearer. Earthworm - A Friend of Farmer. 🌾
