# Earthworm Architecture & Integration Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Client-Side)                       │
│   HTML5 + CSS3 + Vanilla JavaScript (No Dependencies)           │
└─────────────────────────────────────────────────────────────────┘
         │
         ├─── Offline Demo Data (js/data.js)
         │    - 8 Crop Profiles
         │    - 3 Sample Mandis
         │    - 4 Storage Methods
         │    - Static Price Trends
         │
         └─── API Integration Layer (Future)
              ├─── Weather API
              │    └─ IMD (India Meteorological Dept)
              │    └─ OpenWeatherMap
              │    └─ Real-time forecasts
              │
              ├─── Market Data API
              │    └─ Government Mandi Prices
              │    └─ Live auction data
              │    └─ Regional demand
              │
              ├─── AI/ML Backend
              │    └─ Crop maturity prediction
              │    └─ Spoilage risk ML model
              │    └─ Price forecasting
              │    └─ Optimal harvest window
              │
              └─── Location Services
                   └─ Geolocation API
                   └─ Distance calculation
                   └─ Nearby mandi finder

```

## 🔌 Integration Points

### 1. Weather Data Integration

**Current Implementation (Mock):**
```javascript
const WEATHER_DATA = {
  current: {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
  },
  forecast: {
    nextThreeDays: 'Clear skies',
    nextWeek: 'Light rain possible on Day 5',
    nextMonth: 'Heat wave likely in April'
  }
};
```

**Future: Real API Integration**
```javascript
async function getWeatherData(latitude, longitude) {
  try {
    // Option 1: Government IMD API
    const response = await fetch(
      `https://api.imd.gov.in/weather/${latitude},${longitude}`
    );
    const data = await response.json();
    
    return {
      current: {
        temp: data.temperature,
        humidity: data.humidity,
        rainfall: data.precipitation,
        windSpeed: data.wind_speed
      },
      forecast: {
        next3Days: data.forecast_3days,
        next7Days: data.forecast_7days,
        next30Days: data.forecast_30days
      },
      dataSource: 'IMD',
      confidence: 90
    };
  } catch (error) {
    console.log('Using offline weather data');
    return WEATHER_DATA; // Fallback to demo
  }
}
```

**Integration in Harvest Advice:**
```javascript
async function getHarvestAdvice(cropType, sowingDate, location) {
  // Get real weather data
  const weather = await getWeatherData(location.lat, location.lng);
  
  // Check if heavy rain predicted
  const rainRisk = weather.forecast.next7Days.rainfall > 50;
  if (rainRisk) {
    return {
      ...harvestWindow,
      weatherWarning: 'Heavy rain expected! Harvest immediately!',
      riskLevel: 'High'
    };
  }
  
  return harvestAdvice;
}
```

### 2. Market Price Data Integration

**Current Implementation (Mock):**
```javascript
const MANDIS = {
  default: [
    {
      name: 'Delhi Mandi',
      price: 2500,
      distance: 45,
      // ...
    }
  ]
};
```

**Future: Live Price Integration**
```javascript
async function getLiveMandiPrices(cropType, state) {
  try {
    // Government Mandi prices API
    const response = await fetch(
      `https://agmarknet.gov.in/api/prices?crop=${cropType}&state=${state}`
    );
    const mandiData = await response.json();
    
    return mandiData.map(mandi => ({
      name: mandi.market_name,
      price: mandi.modal_price,
      distance: calculateDistance(userLocation, mandi.location),
      demand: mandi.arrival_qt > average ? 'High' : 'Low',
      lastUpdated: mandi.latest_date,
      source: 'AgMarkNet'
    }));
  } catch (error) {
    return MANDIS.default; // Fallback
  }
}
```

### 3. AI/ML Model Integration

**Harvest Prediction Model**
```javascript
async function predictHarvestDate(cropType, sowingDate, soilData, weatherForecast) {
  const features = {
    days_since_sowing: calculateDays(sowingDate),
    avg_temperature: weatherForecast.avgTemp,
    rainfall_mm: weatherForecast.rainfall,
    soil_moisture: soilData.moisture,
    soil_nitrogen: soilData.nitrogen,
    // ... more features
  };
  
  try {
    // Call ML API
    const response = await fetch('https://earthworm-ml-api.herokuapp.com/predict/harvest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: cropType,
        features: features
      })
    });
    
    const prediction = await response.json();
    return {
      predictedDate: prediction.harvest_date,
      confidence: prediction.confidence_score,
      reasoning: prediction.explanation
    };
  } catch (error) {
    // Fallback to rule-based system
    return HARVEST_WINDOWS[cropType];
  }
}
```

**Spoilage Risk ML Model**
```javascript
async function getMLSpoilageRisk(storageType, transportTime, temp, crop) {
  const features = {
    storage_type: encodeStorage(storageType),
    transport_hours: transportTime,
    temperature_c: temp,
    crop_type: encodeCrop(crop),
    humidity: sensor_data.humidity,
    light_exposure: sensor_data.light
  };
  
  const response = await fetch('https://earthworm-ml-api.herokuapp.com/predict/spoilage', {
    method: 'POST',
    body: JSON.stringify(features)
  });
  
  const prediction = await response.json();
  return {
    riskPercentage: prediction.spoilage_risk,
    confidence: prediction.model_confidence,
    topSuggestions: prediction.top_recommendations
  };
}
```

### 4. Location Services Integration

**Real-Time Mandi Finder**
```javascript
async function findNearbyMandis(latitude, longitude, radius = 50) {
  try {
    // Get coordinates
    const mandis = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearby/json?` +
      `location=${latitude},${longitude}` +
      `&radius=${radius * 1000}` +
      `&keyword=mandi+market`
    );
    
    const results = await mandis.json();
    
    return results.results.map(mandi => ({
      name: mandi.name,
      location: mandi.geometry.location,
      distance: haversineDistance(
        {latitude, longitude},
        mandi.geometry.location
      ),
      rating: mandi.rating,
      openNow: mandi.opening_hours?.open_now
    }));
  } catch (error) {
    return MANDIS.default;
  }
}
```

## 🤖 ML Model Specifications

### 1. Harvest Date Prediction Model

**Input Features:**
- Crop type (8 classes)
- Sowing date
- Days since sowing
- Cumulative growing degree days (GDD)
- Average temperature (last 30 days)
- Total rainfall (last 30 days)
- Soil moisture content
- Soil nitrogen levels
- Soil pH
- Location/latitude

**Output:**
- Harvest date (±5 days confidence interval)
- Confidence score (0-100%)
- Risk factors
- Weather recommendations

**Suggested Algorithm:** 
- Random Forest or Gradient Boosting
- Training data: 10+ years of district-level harvest records
- Validation: Compare predicted vs actual dates from previous seasons

**Implementation:**
- TensorFlow.js for client-side inference
- Or simple Flask/FastAPI backend

### 2. Spoilage Risk Prediction Model

**Input Features:**
- Crop type
- Storage temperature (°C)
- Humidity (%)
- Storage type (4 classes)
- Transport duration (hours)
- Transport mode
- Initial produce quality (1-10)
- Storage ventilation score
- Days in storage
- Location altitude

**Output:**
- Spoilage risk percentage (0-100)
- Confidence score
- Recommended preservation methods (ranked)
- Days until significant spoilage occurs

**Suggested Algorithm:**
- Gradient Boosting (XGBoost)
- Neural Network (for complex interactions)
- Training data: Industry spoilage studies, APEDA data

### 3. Market Price Forecasting

**Input Features:**
- Crop type
- Previous 30 days prices
- Seasonal trends
- Current supply
- Expected harvest
- Weather forecast
- District/region

**Output:**
- Predicted price (next 7 days)
- Price confidence interval
- Trend (up/down/stable)
- Similar historical patterns

## 🔌 API Endpoints Reference

### Government Mandi API
**Endpoint:** `https://agmarknet.gov.in/api/prices`
**Parameters:**
```javascript
{
  commodity: 'wheat',          // Crop name
  state: 'delhi',              // State code
  district: 'new-delhi',       // Optional
  date: '2026-02-26'           // Optional
}
```

**Response:**
```json
[
  {
    "market_name": "Delhi Mandi",
    "market_code": "DL001",
    "commodity": "Wheat",
    "modal_price": 2500,
    "min_price": 2400,
    "max_price": 2600,
    "avg_price": 2500,
    "arrival_qt": 5000,
    "latest_date": "2026-02-26T10:30:00Z"
  }
]
```

### IMD Weather API
**Endpoint:** `https://api.imd.gov.in/v1/weather`
**Parameters:**
```javascript
{
  lat: 28.6139,
  lng: 77.2090,
  format: 'json'
}
```

**Response:**
```json
{
  "location": "Delhi",
  "current": {
    "temperature": 28,
    "humidity": 65,
    "wind_speed": 12,
    "pressure": 1013,
    "visibility": 10
  },
  "forecast": {
    "3_day": [...],
    "7_day": [...],
    "30_day": [...]
  }
}
```

## 🛠️ Development Setup

### Local Backend Setup

**Python/Flask Example:**
```python
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np

app = Flask(__name__)

# Load pre-trained models
harvest_model = keras.models.load_model('models/harvest_prediction.h5')
spoilage_model = keras.models.load_model('models/spoilage_risk.h5')

@app.route('/api/predict/harvest', methods=['POST'])
def predict_harvest():
    data = request.json
    features = np.array([
        data['days_since_sowing'],
        data['avg_temperature'],
        data['rainfall'],
        # ... more features
    ]).reshape(1, -1)
    
    prediction = harvest_model.predict(features)
    return jsonify({
        'harvest_date': prediction['date'],
        'confidence': float(prediction['confidence']),
        'explanation': 'Based on temperature trends and rainfall...'
    })

@app.route('/api/predict/spoilage', methods=['POST'])
def predict_spoilage():
    data = request.json
    features = np.array([...]).reshape(1, -1)
    
    risk = spoilage_model.predict(features)
    return jsonify({
        'spoilage_risk': float(risk),
        'recommendations': ['...', '...']
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### Configuration File

Create `config.json`:
```json
{
  "api": {
    "weather": {
      "enabled": false,
      "provider": "imd",
      "api_key": "YOUR_IMD_KEY"
    },
    "prices": {
      "enabled": false,
      "provider": "agmarknet",
      "api_key": "YOUR_AGMARKNET_KEY"
    },
    "ai": {
      "enabled": false,
      "backend_url": "http://localhost:5000",
      "timeout": 5000
    }
  },
  "fallback_to_demo": true,
  "cache_duration": 3600000
}
```

## 📊 Data Sources

### Government Sources (Official)
1. **AgMarkNet** - Mandi prices
   - Website: https://agmarknet.gov.in
   - Daily updates
   - 460+ mandis across India

2. **IMD (India Meteorological Department)**
   - Website: https://www.imd.gov.in
   - Weather forecasts
   - Historical climate data

3. **APEDA (Agricultural & Processed Food Products Export Development Authority)**
   - Export data
   - Price trends
   - Quality standards

### Research Sources (For ML Training)
1. **ICRISAT** - Crop research
2. **NITI Aayog** - Agricultural statistics
3. **Ministry of Agriculture** - Official data
4. **State Agricultural Departments** - Regional data

## 🧪 Testing Integration

### Test Cases

**Test 1: Weather API Fallback**
```javascript
// Test that system falls back to demo data if API fails
const weather = await getWeatherData(-1, -1); // Invalid coords
assert(weather.source === 'demo');
```

**Test 2: Price Calculation Accuracy**
```javascript
const profit = calculateNetProfit(2500, 50, 500);
assert(profit === 1500); // price - cost
```

**Test 3: Spoilage Risk Range**
```javascript
const risk = calculateSpoilageRisk('field', 24, 35);
assert(risk >= 0 && risk <= 100);
```

**Test 4: Language Switching**
```javascript
setLanguage('hi');
assert(currentLanguage === 'hi');
assert(getTranslation('harvest') returns Hindi text);
```

## 🚀 Deployment Checklist

### Before Going Live

- [ ] All APIs have fallback mechanisms
- [ ] Error handling for network failures
- [ ] Data validation on all inputs
- [ ] Rate limiting configured
- [ ] CORS headers properly set
- [ ] HTTPS enforced
- [ ] Cache headers configured
- [ ] Error logging implemented
- [ ] Performance monitoring enabled
- [ ] Security audit completed
- [ ] Accessibility compliance verified
- [ ] Mobile testing on target devices completed
- [ ] Load testing (1000+ concurrent users)
- [ ] Backup and disaster recovery plan

## 📈 Success Metrics

1. **Adoption:** % of target farmers using the app
2. **Accuracy:** Actual harvest dates vs predicted dates
3. **Profit:** Average profit increase for users
4. **Satisfaction:** User ratings and feedback
5. **Reliability:** API uptime percentage
6. **Performance:** Page load time < 2 seconds

---

**Ready for Integration!** This architecture is designed to be gradually enhanced from demo data to full AI/ML-powered recommendations.

For questions on implementation, refer to README.md or the inline code documentation.
