# Earthworm - Quick Start Guide

## ⚡ Start in 30 Seconds

### Option 1: Direct Browser
1. Download all files
2. Open `index.html` in your browser
3. Click any colored button to explore

### Option 2: Simple Python Server (For Testing)
```bash
# Windows
python -m http.server 8000

# Mac/Linux
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

### Option 3: Visual Studio Code
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Done! Auto-opens in browser with live reload

---

## 🎮 Complete Demo Walkthrough

### Demo Scenario: Wheat Farmer in Haryana

#### STEP 1: Home Page (index.html)
```
What you see:
- 🌾 Big Earthworm logo
- Hindi/English toggle button (top right)
- 3 colored action buttons
- Weather & market updates

Action: Click 🌾 "Best Harvest Time" button
```

#### STEP 2: Harvest Advice Page

```
Form to fill:
├─ Crop: Select "गेहूं / Wheat"
├─ Sowing Date: 2025-10-15
└─ Location: Haryana

Click "Get Harvest Advice ✓"
```

**What happens next:**

Results show:
```
✅ Analysis Complete

⛅ Weather Risk: Low
   Rain expected after 3 days, perfect for harvest

📅 Optimal Harvest Date: March 25, 2026
⏰ Days Remaining: 27 days

💹 Price Trend: 📉 -5%
   Prices falling, but weather urgency is high

❓ Why this advice? (Click to expand)
   ├─ Crop maturity: 165 days from sowing → Optimal March 25
   ├─ Weather: Clear forecast for next 3 weeks, rain after
   ├─ Quality: Winter weather = best grain quality
   └─ Market: Prices down 5%, but loss risk > gain

📊 Data from: IMD Weather, Mandi Data, Soil Records
✓ Confidence: 92%
```

**Action:** Click "Next: Find Best Market →"

---

#### STEP 3: Market Finder Page

```
Form shows:
├─ Crop: "Wheat" (pre-filled)
└─ Location: "Haryana" (pre-filled)

Click "Find Best Markets ✓"
```

**What happens next:**

Results show:
```
🏪 Top 3 Best Markets for You

Market 1: ⭐ BEST OPTION
📍 Haryana Local Mandi
   ├─ 📍 Distance: 8 km
   ├─ 💵 Price: ₹2200/unit
   ├─ 🕐 Transport: 0.5 hours
   ├─ 📊 Demand: High
   └─ Transport Cost: ₹50

💰 Net Profit: ₹2150 per unit ← Highest!

────────────────────────────────

Market 2: Delhi Mandi
📍 Distance: 45 km
💵 Price: ₹2500/unit
🕐 Transport: 2 hours
Transport Cost: ₹200
💰 Net Profit: ₹2300 per unit

────────────────────────────────

Market 3: Mumbai Mandi
📍 Distance: 650 km
💵 Price: ₹2800/unit
🕐 Transport: 18 hours
Transport Cost: ₹1500
💰 Net Profit: ₹1300 per unit (Too far!)

❓ Why is Haryana Local Mandi best?
   ├─ Lowest travel distance = Lowest cost
   ├─ Freshest produce = Less spoilage
   ├─ Highest net profit = Most money in pocket
   └─ Quick turnover = No storage needed
```

**Action:** Click "Next: Check Storage & Spoilage Risk →"

---

#### STEP 4: Spoilage Risk Analysis Page

```
Form to fill:
├─ Storage Type: "Home Storage"
├─ Transport Time: 0.5 hours
└─ Temperature: 25°C (room temperature)

Click "Analyze Spoilage Risk ✓"
```

**What happens next:**

Results show:
```
🧊 Spoilage Risk Analysis

      ✅
   LOW RISK
    25%

(Perfect conditions for transport!)

📦 Storage Type: Home Storage
🕐 Transport Time: 0.5 hours
🌡️ Temperature: 25°C

═══════════════════════════════════

💡 Ranked Preservation Suggestions

1️⃣ Ventilated Crates (BEST)
   💰 Cost: Low (₹500)
   📈 Impact: Medium (60%)
   
   How: Use wooden crates with air holes.
   Steps:
   ✓ Arrange wheat loosely in crates
   ✓ Ensure air gaps between bags
   ✓ Stack crates with spacing
   
   ➜ Result: Extends shelf life 15-20 days

────────────────────────────────

2️⃣ Night Transport
   💰 Cost: Zero (₹0)
   📈 Impact: High (85%)
   
   How: Travel during cool night hours.
   Steps:
   ✓ Plan delivery for 11 PM - 4 AM
   ✓ Cover with wet cloth
   ✓ Use cool truck
   
   ➜ Result: 40% less spoilage vs day transport

────────────────────────────────

3️⃣ Cold Storage
   💰 Cost: High (₹5000)
   📈 Impact: Very High (95%)
   
   How: Temperature-controlled storage.
   Steps:
   ✓ Pre-cool produce before storage
   ✓ Maintain 2-4°C temperature
   ✓ Monitor humidity
   
   ➜ Result: Preserves for weeks!
   ⚠️ Not needed for wheat (moving same day)

────────────────────────────────

4️⃣ Dry/Process Form
   💰 Cost: Medium (₹2000)
   📈 Impact: High (90%)
   
   How: Convert to flour or processed product.
   Steps:
   ✓ Select quality wheat
   ✓ Clean and prepare
   ✓ Follow food safety standards
   
   ➜ Result: Months of shelf life + higher price!

═══════════════════════════════════

❓ How was risk calculated?

Risk Formula:
- Base risk: 10%
- Storage type: +15% (home storage)
- Transport time: +0% (only 0.5 hours)
- Temperature: +0% (25°C is ideal)
─────────────────
Total: 25% risk

🌡️ Temperature Breakdown:
  <10°C: Risk of chill damage (+5%)
  10-25°C: Optimal range! (no impact) ✓
  25-30°C: Moderate warmth (+8%)
  >30°C: Rapid spoilage (+15%)

📊 Data from:
  ✓ Storage condition standards
  ✓ Microbial growth rates
  ✓ Industry spoilage data
  
✓ Confidence: 88%
```

---

## 📱 Mobile Testing

### Test on Your Phone
1. **iPhone:**
   - Open Safari
   - Type localhost:8000 (if local server)
   - Or email yourself the file and open

2. **Android:**
   - Open Chrome
   - Type localhost:8000
   - Or use file manager to open index.html

### What to Check
- [ ] Large buttons work on touch
- [ ] Font is readable (not too small)
- [ ] Colors are visible
- [ ] Language toggle works
- [ ] Voice button appears
- [ ] Click results load smoothly
- [ ] Can scroll all content
- [ ] Print button works

---

## 🎨 Try Different Scenarios

### Scenario 1: Rice Farmer (South India)
```
Crop: धान / Rice
Sowing: 2025-06-15
Location: Tamil Nadu or Karnataka

Expected: Monsoon risk warning, Oct-Nov harvest
```

### Scenario 2: Tomato Farmer (Urgent!)
```
Crop: टमाटर / Tomato  
Sowing: 2025-08-15
Location: Karnataka

Expected: High demand, spoilage urgent, daytime: high risk
```

### Scenario 3: Potato Storage Expert
```
Crop: आलू / Potato
Sowing: 2025-10-15
Location: Bihar

Storage: Warehouse
Transport: 8 hours
Temp: 20°C

Expected: Good storage opportunity, 30-40% spoilage risk
```

### Scenario 4: Worst Case - Sugarcane in Summer  
```
Crop: गन्ना / Sugarcane
Storage: Field
Transport: 12 hours
Temperature: 38°C

Expected: Very high risk (80%+), urgent recommendations
```

---

## 🔧 Troubleshooting

### Problem: Page doesn't load
**Solution:**
- Check file path is correct
- Verify all files are in same folder
- Try refreshing browser (Ctrl+R)
- Check browser console for errors (F12)

### Problem: Forms don't work
**Solution:**
- Fill ALL required fields (*)
- Use valid date format
- Check browser is modern (Chrome 50+, Safari 11+)

### Problem: Language toggle doesn't work
**Solution:**
- Check if .js files loaded (F12 Console)
- Refresh page
- Clear browser cache

### Problem: Voice button doesn't work
**Solution:**
- Voice not supported on all browsers
- Try Chrome or Edge
- Check microphone permissions
- This is optional - app fully works without it

### Problem: Results don't appear
**Solution:**
- Check form validation (all fields must have values)
- Look for error message
- Check browser console (F12) for JavaScript errors
- Try different crop/location combination

---

## 📊 Demo Data Values

All demo values are realistic but synthetic for testing:

### Crops Included
| Crop | Hindi | Sowing | Harvest | Days |
|------|-------|--------|---------|------|
| Wheat | गेहूं | Oct 15 | Mar 25 | 165 |
| Rice | धान | Jun 15 | Nov 5 | 120 |
| Cotton | कपास | Apr 15 | Nov 25 | 240 |
| Sugarcane | गन्ना | Oct 15 | Apr 1 | 180 |
| Potato | आलू | Oct 15 | Feb 5 | 90 |
| Onion | प्याज | Jun 15 | Jan 5 | 180 |
| Tomato | टमाटर | Aug 15 | Nov 15 | 60 |
| Soybean | सोयाबीन | May 15 | Oct 5 | 120 |

### Sample Mandi Prices
- Delhi Mandi: ₹2500 | 45 km
- Mumbai Mandi: ₹2800 | 650 km
- Local Mandi: ₹2200 | 8 km

### Storage Types
- Field Storage (High risk)
- Home Storage (Medium risk)
- Warehouse (Low risk)
- Cold Storage (Very low risk)

---

## 🧪 Automated Testing Script

Test all functionality in sequence:

```javascript
// Open browser console (F12) and paste:

async function testEarthworm() {
  console.log('🧪 Starting Earthworm Tests...\n');
  
  // Test 1: Language
  console.log('Test 1: Language Toggle');
  setLanguage('hi');
  console.log('✓ Hindi set:', currentLanguage === 'hi' ? 'PASS' : 'FAIL');
  
  // Test 2: Data Loading
  console.log('\nTest 2: Demo Data');
  const harvest = getHarvestAdvice('wheat', '2025-10-15', 'Delhi');
  console.log('✓ Harvest data:', harvest ? 'PASS' : 'FAIL');
  
  // Test 3: Market Ranking
  console.log('\nTest 3: Market Ranking');
  const markets = getBestMarkets('wheat', 'Delhi');
  console.log('✓ Markets sorted:', markets[0].netProfit >= markets[1].netProfit ? 'PASS' : 'FAIL');
  
  // Test 4: Spoilage Calculation
  console.log('\nTest 4: Spoilage Risk');
  const risk = calculateSpoilageRisk('home', 2, 25);
  console.log('✓ Risk in range:', risk > 0 && risk < 100 ? 'PASS' : 'FAIL');
  
  // Test 5: Storage
  console.log('\nTest 5: Local Storage');
  saveToDraft('test', {value: 123});
  const loaded = loadFromDraft('test');
  console.log('✓ Draft save:', loaded?.value === 123 ? 'PASS' : 'FAIL');
  
  console.log('\n✅ All tests completed!');
}

testEarthworm();
```

---

## 📞 Support

### Common Questions

**Q: Can I modify the demo data?**
A: Yes! Edit `js/data.js` to change crop prices, mandi data, etc.

**Q: How do I add a new crop?**
A: Add to CROPS, HARVEST_WINDOWS, PRICE_TRENDS in `js/data.js`

**Q: Can I use this offline?**
A: Yes! Everything works offline with demo data.

**Q: How do I add local weather data?**
A: Create `getWeatherData()` function in `js/main.js` connecting to your API

**Q: Can I translate to more languages?**
A: Yes! Add to translations object in `js/main.js`

---

## 🎓 Learning Path

1. **Understand:**
   - Play with demo for 10 minutes
   - Read design philosophy in README
   
2. **Explore:**
   - Try all 4 pages with different scenarios
   - Check console for any messages
   - Look at code structure in js/ folder
   
3. **Modify:**
   - Change demo data values
   - Add a new crop
   - Customize colors in css/style.css
   
4. **Integrate:**
   - Follow ARCHITECTURE.md for API integration
   - Connect real weather data
   - Add live mandi prices
   
5. **Deploy:**
   - Push to web server
   - Test on target phones
   - Gather farmer feedback

---

## 🚀 Next Steps

1. **Play with the demo** - 10 minutes
2. **Read the README** - 15 minutes
3. **Explore the code** - 30 minutes
4. **Follow ARCHITECTURE.md** - 1 hour
5. **Integrate real data** - Custom timeline
6. **Deploy to production** - Based on readiness

---

**You're all set! Click index.html and start exploring.** 🌾

Questions? Check README.md, ARCHITECTURE.md, or review the code comments!
