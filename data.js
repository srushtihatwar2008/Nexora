/* ==========================================
   Earthworm - Demo Data & Simulation
   ========================================== */

const CROPS = {
  wheat: { en: 'Wheat', hi: 'गेहूं' },
  rice: { en: 'Rice', hi: 'धान' },
  cotton: { en: 'Cotton', hi: 'कपास' },
  sugarcane: { en: 'Sugarcane', hi: 'गन्ना' },
  potato: { en: 'Potato', hi: 'आलू' },
  onion: { en: 'Onion', hi: 'प्याज' },
  tomato: { en: 'Tomato', hi: 'टमाटर' },
  soybean: { en: 'Soybean', hi: 'सोयाबीन' }
};

const HARVEST_WINDOWS = {
  wheat: {
    sowing: '2025-10-15',
    harvestStart: '2026-03-15',
    harvestEnd: '2026-04-15',
    days: 180,
    optimalDay: '2026-03-25',
    weatherRisk: 'Low',
    riskDescription: 'Clear forecast for harvest period, low rain probability'
  },
  rice: {
    sowing: '2025-06-15',
    harvestStart: '2025-10-15',
    harvestEnd: '2025-11-15',
    days: 120,
    optimalDay: '2025-11-05',
    weatherRisk: 'Moderate',
    riskDescription: 'Monsoon may extend, harvest after rains pass'
  },
  cotton: {
    sowing: '2025-04-15',
    harvestStart: '2025-11-15',
    harvestEnd: '2025-12-15',
    days: 240,
    optimalDay: '2025-11-25',
    weatherRisk: 'Low',
    riskDescription: 'Winter weather perfect for cotton, low spoilage risk'
  },
  sugarcane: {
    sowing: '2025-10-15',
    harvestStart: '2026-03-01',
    harvestEnd: '2026-05-15',
    days: 180,
    optimalDay: '2026-04-01',
    weatherRisk: 'Moderate',
    riskDescription: 'Heat wave may come, harvest early morning'
  },
  potato: {
    sowing: '2025-10-15',
    harvestStart: '2026-01-15',
    harvestEnd: '2026-02-15',
    days: 90,
    optimalDay: '2026-02-05',
    weatherRisk: 'Low',
    riskDescription: 'Cool weather prevents sprouting, ideal conditions'
  },
  onion: {
    sowing: '2025-06-15',
    harvestStart: '2025-12-15',
    harvestEnd: '2026-01-15',
    days: 180,
    optimalDay: '2026-01-05',
    weatherRisk: 'Low',
    riskDescription: 'Dry season, perfect for storage and transport'
  },
  tomato: {
    sowing: '2025-08-15',
    harvestStart: '2025-10-15',
    harvestEnd: '2025-12-15',
    days: 60,
    optimalDay: '2025-11-15',
    weatherRisk: 'Moderate',
    riskDescription: 'Early rain risk in North, later in South'
  },
  soybean: {
    sowing: '2025-05-15',
    harvestStart: '2025-09-15',
    harvestEnd: '2025-10-15',
    days: 120,
    optimalDay: '2025-10-05',
    weatherRisk: 'Moderate',
    riskDescription: 'Post-monsoon period, ensure field drainage'
  }
};

const MANDIS = {
  default: [
    {
      name: {
        en: 'Delhi Mandi',
        hi: 'दिल्ली मंडी'
      },
      distance: 45,
      price: 2500,
      transport: 2,
      transportCost: 200,
      demand: 'High',
      demandEmoji: '📈'
    },
    {
      name: {
        en: 'Mumbai Mandi',
        hi: 'मुंबई मंडी'
      },
      distance: 650,
      price: 2800,
      transport: 18,
      transportCost: 1500,
      demand: 'High',
      demandEmoji: '📈'
    },
    {
      name: {
        en: 'Local Mandi',
        hi: 'स्थानीय मंडी'
      },
      distance: 8,
      price: 2200,
      transport: 0.5,
      transportCost: 50,
      demand: 'Moderate',
      demandEmoji: '➡️'
    }
  ]
};

const STORAGE_TYPES = {
  field: { en: 'Field Storage', hi: 'खेत में भंडारण' },
  home: { en: 'Home Storage', hi: 'घर में भंडारण' },
  warehouse: { en: 'Warehouse', hi: 'गोदाम' },
  coldStorage: { en: 'Cold Storage', hi: 'कोल्ड स्टोरेज' }
};

const PRESERVATION_SUGGESTIONS = {
  default: [
    {
      rank: 1,
      name: {
        en: 'Ventilated Crates',
        hi: 'हवादार क्रेट्स'
      },
      cost: 'Low',
      costValue: 500,
      impact: 'Medium',
      impactValue: 60,
      description: {
        en: 'Use wooden or plastic crates with ventilation holes. Prevents moisture buildup and extends shelf life by 15-20 days.',
        hi: 'हवादार सुराख़ों वाले क्रेट्स का उपयोग करें। नमी को रोकते हैं और शेल्फ लाइफ 15-20 दिन बढ़ाते हैं।'
      },
      steps: [
        { en: 'Arrange produce loosely', hi: 'उपज को ढीला रखें' },
        { en: 'Ensure airflow between items', hi: 'वस्तुओं के बीच हवा का प्रवाह' },
        { en: 'Stack crates with gaps', hi: 'क्रेट्स को अंतराल के साथ स्टैक करें' }
      ]
    },
    {
      rank: 2,
      name: {
        en: 'Night Transport',
        hi: 'रात को परिवहन'
      },
      cost: 'Zero',
      costValue: 0,
      impact: 'High',
      impactValue: 85,
      description: {
        en: 'Transport during cooler night hours reduces heat stress on produce. Significantly reduces spoilage during transit.',
        hi: 'ठंडी रात में परिवहन करें। सड़क में सड़ने का जोखिम 40% कम हो जाता है।'
      },
      steps: [
        { en: 'Plan delivery for night', hi: 'रात को डिलीवरी की योजना बनाएं' },
        { en: 'Cover with wet cloth', hi: 'गीले कपड़े से ढकें' },
        { en: 'Verify vehicle is cool', hi: 'वाहन सफाई की जांच करें' }
      ]
    },
    {
      rank: 3,
      name: {
        en: 'Cold Storage',
        hi: 'कोल्ड स्टोरेज'
      },
      cost: 'High',
      costValue: 5000,
      impact: 'Very High',
      impactValue: 95,
      description: {
        en: 'Temperature-controlled storage (2-4°C) preserves produce for weeks. Best for high-value perishables like tomatoes and leafy greens.',
        hi: 'तापमान नियंत्रित भंडारण (2-4°C)। सब्जियों को कई हफ्तों तक ताज़ा रखता है।'
      },
      steps: [
        { en: 'Pre-cool before storage', hi: 'भंडारण से पहले ठंडा करें' },
        { en: 'Maintain temperature', hi: 'तापमान बनाए रखें' },
        { en: 'Monitor humidity', hi: 'नमी की निगरानी करें' }
      ]
    },
    {
      rank: 4,
      name: {
        en: 'Dried/Processed Form',
        hi: 'सूखा/संसाधित रूप'
      },
      cost: 'Medium',
      costValue: 2000,
      impact: 'High',
      impactValue: 90,
      description: {
        en: 'Dry or process produce into jams, pickles, or flour. Longest shelf life, value addition, premium pricing.',
        hi: 'उपज को सुखाएं या अचार, चूर्ण में बदलें। सबसे लंबी शेल्फ लाइफ।'
      },
      steps: [
        { en: 'Select quality produce', hi: 'गुणवत्ता चुनें' },
        { en: 'Clean and prepare', hi: 'सफाई और तैयारी' },
        { en: 'Follow food safety', hi: 'खाद्य सुरक्षा का पालन करें' }
      ]
    }
  ]
};

const WEATHER_DATA = {
  current: {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    conditionEmoji: '⛅'
  },
  forecast: {
    nextThreeDays: 'Clear skies',
    nextWeek: 'Light rain possible on Day 5',
    nextMonth: 'Heat wave likely in April'
  }
};

const PRICE_TRENDS = {
  wheat: { trend: 'down', change: -5, reason: 'Increased supply from harvest' },
  rice: { trend: 'up', change: 8, reason: 'Lower supply, increased demand' },
  cotton: { trend: 'stable', change: 0, reason: 'Market equilibrium' },
  sugarcane: { trend: 'down', change: -3, reason: 'Season starting, fresh harvest' },
  potato: { trend: 'up', change: 12, reason: 'Off-season period, high demand' },
  onion: { trend: 'down', change: -8, reason: 'New harvest excess supply' },
  tomato: { trend: 'up', change: 15, reason: 'Low supply, high demand' },
  soybean: { trend: 'stable', change: 2, reason: 'Stable market conditions' }
};

/* ==========================================
   Calculation Functions
   ========================================== */

function calculateDaysToHarvest(cropType, sowingDate) {
  const harvest = HARVEST_WINDOWS[cropType] || HARVEST_WINDOWS.wheat;
  const days = Math.floor((new Date(harvest.optimalDay) - new Date(sowingDate)) / (1000 * 60 * 60 * 24));
  return days;
}

function calculateSpoilageRisk(storageType, transportTime, temperature) {
  let baseRisk = 10;
  
  // Storage type impact
  const storageRisks = {
    field: 40,
    home: 25,
    warehouse: 15,
    coldStorage: 5
  };
  baseRisk += storageRisks[storageType] || 20;
  
  // Transport time impact (hours)
  baseRisk += Math.min(transportTime * 2, 30);
  
  // Temperature impact
  if (temperature > 30) baseRisk += 15;
  else if (temperature > 25) baseRisk += 8;
  else if (temperature < 10) baseRisk += 5;
  
  return Math.min(baseRisk, 95);
}

function getRiskLevel(percentage) {
  if (percentage <= 30) return { level: 'Low', emoji: '✅', color: 'safe' };
  if (percentage <= 60) return { level: 'Medium', emoji: '⚠️', color: 'moderate' };
  return { level: 'High', emoji: '🔴', color: 'high' };
}

function calculateNetProfit(basePrice, distance, transportCost, marketWeight = 1) {
  const weightedPrice = basePrice * marketWeight;
  const netProfit = weightedPrice - transportCost;
  return netProfit;
}

function getConfidenceScore(dataPoints) {
  // Simulated confidence based on data availability
  // In real implementation, this would be based on ML model confidence
  const baseConfidence = Math.min(dataPoints * 15, 95);
  return Math.floor(baseConfidence);
}

function formatCurrency(value) {
  return '₹ ' + value.toLocaleString('en-IN');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getDaysUntil(dateString) {
  const target = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const days = Math.floor((target - today) / (1000 * 60 * 60 * 24));
  return days;
}

/* ==========================================
   Get Data Functions
   ========================================== */

function getHarvestAdvice(cropType, sowingDate, location) {
  const window = HARVEST_WINDOWS[cropType] || HARVEST_WINDOWS.wheat;
  const daysToHarvest = getDaysUntil(window.optimalDay);
  const trend = PRICE_TRENDS[cropType] || { trend: 'stable', change: 0 };
  
  return {
    cropType,
    sowingDate,
    harvestWindow: {
      start: window.harvestStart,
      end: window.harvestEnd,
      optimal: window.optimalDay,
      daysToOptimal: daysToHarvest
    },
    weatherRisk: window.weatherRisk,
    weatherDescription: window.riskDescription,
    priceTrend: trend.trend,
    priceChange: trend.change,
    priceReason: trend.reason,
    confidence: getConfidenceScore(4),
    dataPoints: ['Weather forecast', 'Historical data', 'Price trends', 'Soil condition']
  };
}

function getBestMarkets(cropType, location) {
  const mandis = MANDIS.default;
  return mandis.map(mandi => ({
    ...mandi,
    netProfit: calculateNetProfit(mandi.price, mandi.distance, mandi.transportCost)
  })).sort((a, b) => b.netProfit - a.netProfit);
}

function getSpoilageAnalysis(storageType, transportTime, temperature) {
  const riskPercentage = calculateSpoilageRisk(storageType, transportTime, temperature);
  const riskLevel = getRiskLevel(riskPercentage);
  
  return {
    riskPercentage,
    riskLevel,
    storageType,
    transportTime,
    temperature,
    suggestions: PRESERVATION_SUGGESTIONS.default,
    confidence: getConfidenceScore(3),
    dataPoints: ['Storage type', 'Transport conditions', 'Temperature data']
  };
}
