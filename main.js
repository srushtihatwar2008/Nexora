/* ==========================================
   Earthworm - Main Application Logic
   ========================================== */

// Translation strings
const translations = {
  en: {
    harvest: 'Harvest Advice',
    market: 'Best Market',
    storage: 'Storage Help',
    selectCrop: 'Select Crop',
    sowingDate: 'Sowing Date',
    location: 'Location',
    storageType: 'Storage Type',
    getAdvice: 'Get Advice',
    analysis: 'Analysis',
    risk: 'Risk',
    confidence: 'Confidence',
    price: 'Price',
    distance: 'Distance',
    transport: 'Transport Time',
    cost: 'Cost',
    impact: 'Impact',
    dataSource: 'Data Source',
    weatherData: 'Weather Data',
    mandiPrice: 'Mandi Price Data',
    whyAdvice: 'Why this advice?',
    explanation: 'Explanation',
    back: 'Back',
    home: 'Earthworm - A Friend of Farmer',
    subtitle: 'Sahi Samay Pe Katai, Sahi Mandi Me Becho',
    hello: 'Hello Farmer!',
    chooseAction: 'Choose what you need help with.'
  },
  hi: {
    harvest: '🌾 कटाई की सलाह',
    market: '🏪 सर्वश्रेष्ठ बाजार',
    storage: '🧊 भंडारण सहायता',
    selectCrop: 'फसल चुनें',
    sowingDate: 'बुवाई की तारीख़',
    location: 'स्थान',
    storageType: 'भंडारण का प्रकार',
    getAdvice: 'सलाह प्राप्त करें',
    analysis: 'विश्लेषण',
    risk: 'जोखिम',
    confidence: 'विश्वास स्तर',
    price: 'कीमत',
    distance: 'दूरी',
    transport: 'परिवहन समय',
    cost: 'खर्च',
    impact: 'प्रभाव',
    dataSource: 'डेटा स्रोत',
    weatherData: 'मौसम का डेटा',
    mandiPrice: 'मंडी मूल्य डेटा',
    whyAdvice: 'यह सलाह क्यों?',
    explanation: 'व्याख्या',
    back: 'वापस',
    home: 'स्मार्ट कटाई और बाजार सलाहकार',
    subtitle: 'सही समय पे कटाई, सही मंडी में बेचो',
    hello: 'नमस्ते किसान!',
    chooseAction: 'चुनें कि आपको किस चीज़ में मदद चाहिए।'
  }
};

function getTranslation(key) {
  return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

/* ==========================================
   Harvest Advice Page
   ========================================== */

function initHarvestPage() {
  const form = document.getElementById('harvest-form');
  const adviceContainer = document.getElementById('advice-container');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const cropType = document.getElementById('crop').value;
      const sowingDate = document.getElementById('sowing-date').value;
      const location = document.getElementById('location').value;
      
      if (!validateForm(form)) {
        showNotification(
          currentLanguage === 'hi' ? 'कृपया सभी फील्ड भरें' : 'Please fill all fields',
          'error'
        );
        return;
      }
      
      // Save to draft
      saveToDraft('harvest', { cropType, sowingDate, location });
      
      // Get advice
      const advice = getHarvestAdvice(cropType, sowingDate, location);
      displayHarvestAdvice(advice, adviceContainer);
    });
    
    // Load draft if available
    const draft = loadFromDraft('harvest');
    if (draft) {
      document.getElementById('crop').value = draft.cropType;
      document.getElementById('sowing-date').value = draft.sowingDate;
      document.getElementById('location').value = draft.location;
    }
  }
}

function displayHarvestAdvice(advice, container) {
  const cropName = getTranslation(CROPS[advice.cropType]?.en || 'Crop');
  const daysRemaining = advice.harvestWindow.daysToOptimal;
  const trendText = advice.priceTrend === 'up' ? '📈' : advice.priceTrend === 'down' ? '📉' : '➡️';
  
  let html = `
    <div class="card" style="animation: fadeIn 0.5s ease;">
      <div class="card-title">
        🌾 ${getTranslation('harvest')} - ${t(CROPS[advice.cropType]) || 'Selected Crop'}
      </div>
      
      <div class="weather-box">
        <div class="weather-icon">⛅</div>
        <div class="weather-text">${advice.weatherDescription}</div>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">📅 ${getTranslation('Optimal Harvest Date')}</span>
        <span class="stat-value">${formatDate(advice.harvestWindow.optimal)}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">⏰ ${getTranslation('Days Remaining')}</span>
        <span class="stat-value">${daysRemaining > 0 ? daysRemaining + ' ✓' : 'Optimal period passed'}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">🌦️ Weather Risk</span>
        <span class="risk-indicator ${advice.weatherRisk === 'Low' ? 'risk-safe' : advice.weatherRisk === 'Moderate' ? 'risk-moderate' : 'risk-high'}">
          ${advice.weatherRisk}
        </span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">💹 Price Trend</span>
        <span class="stat-value">${trendText} ${advice.priceChange > 0 ? '+' : ''}${advice.priceChange}%</span>
      </div>
      <div class="stat-subtext">${advice.priceReason}</div>
    </div>
    
    <div class="explainability-panel">
      <div class="explainability-header" onclick="toggleExpand(this.nextElementSibling)">
        <span>❓ ${getTranslation('whyAdvice')}</span>
        <span class="explainability-toggle">▼</span>
      </div>
      <div class="explainability-content">
        <p><strong>${getTranslation('Explanation')}:</strong></p>
        <p>${advice.weatherDescription}</p>
        <p style="margin-top: 12px;">Based on your sowing date <strong>${formatDate(advice.sowingDate)}</strong>, your crop needs approximately <strong>${advice.harvestWindow.end - advice.harvestWindow.start} days</strong> to mature.</p>
        
        <p style="margin-top: 12px;">🌼 <strong>Prime Harvest Window:</strong> ${formatDate(advice.harvestWindow.start)} to ${formatDate(advice.harvestWindow.end)}</p>
        <p>✅ <strong>Best Day to Harvest:</strong> ${formatDate(advice.harvestWindow.optimal)} (when conditions are perfect)</p>
        
        <p style="margin-top: 12px;"><strong>💡 Why this timing?</strong></p>
        <ul style="margin-left: 20px; margin-top: 8px;">
          <li>Crop reaches full maturity for maximum yield</li>
          <li>Weather forecast shows clear skies</li>
          <li>Market prices expected to be ${advice.priceChange > 0 ? 'higher' : 'stable'}</li>
          <li>Soil moisture will be optimal for harvest</li>
        </ul>
        
        <div class="data-source">
          <div class="data-source-title">📊 Data Sources:</div>
          <p style="font-size: 13px; margin: 6px 0;">
            ✓ Weather forecast (IMD Data)<br>
            ✓ Historical harvest data<br>
            ✓ Market price trends<br>
            ✓ Your location: ${document.getElementById('location')?.value || 'Not specified'}
          </p>
        </div>
        
        <div class="confidence-display confidence-high">
          ✓ Confidence: ${advice.confidence}%
        </div>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
      <button class="btn btn-secondary" onclick="window.location.href='market.html'">
        Next: Find Best Market →
      </button>
      <button class="btn btn-secondary" onclick="printAdvice('Harvest Advice')">
        📄 Print / Save
      </button>
    </div>
  `;
  
  container.innerHTML = html;
  container.style.display = 'block';
}

/* ==========================================
   Market Advice Page
   ========================================== */

function initMarketPage() {
  const form = document.getElementById('market-form');
  const marketContainer = document.getElementById('market-container');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const cropType = document.getElementById('market-crop').value;
      const location = document.getElementById('market-location').value;
      
      if (!validateForm(form)) {
        showNotification(
          currentLanguage === 'hi' ? 'कृपया सभी फील्ड भरें' : 'Please fill all fields',
          'error'
        );
        return;
      }
      
      saveToDraft('market', { cropType, location });
      
      const markets = getBestMarkets(cropType, location);
      displayMarketAdvice(markets, marketContainer);
    });
    
    const draft = loadFromDraft('market');
    if (draft) {
      document.getElementById('market-crop').value = draft.cropType;
      document.getElementById('market-location').value = draft.location;
    }
  }
}

function displayMarketAdvice(markets, container) {
  let html = `
    <div class="card">
      <div class="card-title">🏪 Top 3 Best Markets for You</div>
      <p style="color: #666; margin-bottom: 16px;">Based on price, distance, and net profit</p>
    </div>
  `;
  
  markets.slice(0, 3).forEach((market, index) => {
    const isBest = index === 0;
    const demandColor = market.demand === 'High' ? '#27ae60' : '#f5b041';
    
    html += `
      <div class="market-item ${isBest ? 'best' : ''}">
        ${isBest ? '<div style="background: #27ae60; color: white; padding: 4px 12px; border-radius: 20px; width: fit-content; font-weight: bold; margin-bottom: 12px; font-size: 12px;">⭐ BEST OPTION</div>' : ''}
        
        <div class="market-name">
          ${index + 1}. ${t(market.name)}
        </div>
        
        <div class="market-details">
          <div class="details-item">
            <div class="details-label">📍 Distance</div>
            <div class="details-value">${market.distance} km</div>
          </div>
          
          <div class="details-item">
            <div class="details-label">💵 Price per Unit</div>
            <div class="details-value">${formatCurrency(market.price)}</div>
          </div>
          
          <div class="details-item">
            <div class="details-label">🕐 Transport Time</div>
            <div class="details-value">${market.transport}h</div>
          </div>
          
          <div class="details-item">
            <div class="details-label">📊 Demand</div>
            <div class="details-value">${market.demandEmoji} ${market.demand}</div>
          </div>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">🚛 Transport Cost</span>
          <span class="stat-value">${formatCurrency(market.transportCost)}</span>
        </div>
        
        <div class="profit-highlight">
          💰 Net Profit: ${formatCurrency(market.netProfit)} per unit
        </div>
      </div>
    `;
  });
  
  html += `
    <div class="explainability-panel">
      <div class="explainability-header" onclick="toggleExpand(this.nextElementSibling)">
        <span>❓ Why is the best market highlighted?</span>
        <span class="explainability-toggle">▼</span>
      </div>
      <div class="explainability-content">
        <p><strong>Market Selection Logic:</strong></p>
        <ul style="margin-left: 20px; margin-top: 8px;">
          <li><strong>Price:</strong> Higher base price for your crop</li>
          <li><strong>Distance:</strong> Less travel = lower transport cost</li>
          <li><strong>Demand:</strong> High demand = quicker sale, no spoilage</li>
          <li><strong>Net Profit:</strong> Actual money in your pocket after costs</li>
        </ul>
        
        <p style="margin-top: 12px;">💡 <strong>Why transport time matters?</strong></p>
        <p>Shorter transport = fresher produce = better price + less spoilage risk</p>
        
        <div class="data-source" style="margin-top: 12px;">
          <div class="data-source-title">📊 Data from:</div>
          <p style="font-size: 13px; margin: 6px 0;">
            ✓ Live Mandi Price Data<br>
            ✓ Distance calculation (Google Maps)<br>
            ✓ Demand aggregation
          </p>
        </div>
        
        <div class="confidence-display confidence-high" style="margin-top: 12px;">
          ✓ Confidence: 88%
        </div>
      </div>
    </div>
    
    <button class="btn btn-primary" style="margin-top: 20px;" onclick="window.location.href='spoilage.html'">
      Next: Check Storage & Spoilage Risk →
    </button>
  `;
  
  container.innerHTML = html;
  container.style.display = 'block';
}

/* ==========================================
   Spoilage Risk Page
   ========================================== */

function initSpoilagePage() {
  const form = document.getElementById('spoilage-form');
  const analysisContainer = document.getElementById('spoilage-container');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const storageType = document.getElementById('storage-type').value;
      const transportTime = parseFloat(document.getElementById('transport-time').value);
      const temperature = parseFloat(document.getElementById('temperature').value);
      
      if (!validateForm(form)) {
        showNotification(
          currentLanguage === 'hi' ? 'कृपया सभी फील्ड भरें' : 'Please fill all fields',
          'error'
        );
        return;
      }
      
      saveToDraft('spoilage', { storageType, transportTime, temperature });
      
      const analysis = getSpoilageAnalysis(storageType, transportTime, temperature);
      displaySpoilageAnalysis(analysis, analysisContainer);
    });
    
    const draft = loadFromDraft('spoilage');
    if (draft) {
      document.getElementById('storage-type').value = draft.storageType;
      document.getElementById('transport-time').value = draft.transportTime;
      document.getElementById('temperature').value = draft.temperature;
    }
  }
}

function displaySpoilageAnalysis(analysis, container) {
  let html = `
    <div class="card">
      <div class="card-title">🧊 Spoilage Risk Analysis</div>
      
      <div style="text-align: center; padding: 20px; background: #f9f8f3; border-radius: 10px; margin: 16px 0;">
        <div style="font-size: 48px; margin-bottom: 12px;">
          ${analysis.riskLevel.emoji}
        </div>
        <div style="font-size: 24px; font-weight: bold; color: ${getRiskColor(analysis.riskLevel.level)}; margin-bottom: 8px;">
          ${analysis.riskLevel.level} Risk
        </div>
        <div style="font-size: 28px; font-weight: bold; color: var(--primary-green);">
          ${analysis.riskPercentage}% Spoilage Risk
        </div>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">📦 Storage Type</span>
        <span class="stat-value">${t(STORAGE_TYPES[analysis.storageType])}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">🕐 Transport Time</span>
        <span class="stat-value">${analysis.transportTime} hours</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">🌡️ Temperature</span>
        <span class="stat-value">${analysis.temperature}°C</span>
      </div>
    </div>
  `;
  
  // Add recommendations
  if (analysis.suggestions && analysis.suggestions.length > 0) {
    html += `<div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
      <h3 style="color: var(--primary-green); margin-bottom: 16px;">💡 Preservation Suggestions (Ranked by Effectiveness)</h3>
    `;
    
    analysis.suggestions.forEach((suggestion) => {
      html += `
        <div class="suggestion-item">
          <div class="suggestion-header">
            <div class="suggestion-ranking">${suggestion.rank}</div>
            <div class="suggestion-title">${t(suggestion.name)}</div>
          </div>
          
          <div class="suggestion-badges">
            <span class="cost-badge cost-${suggestion.cost.toLowerCase()}">${getTranslation('cost')}: ${suggestion.cost} (₹${suggestion.costValue})</span>
            <span class="impact-badge">${getTranslation('impact')}: ${suggestion.impact}</span>
          </div>
          
          <div class="suggestion-description">
            ${t(suggestion.description)}
          </div>
          
          <div style="margin-top: 12px; padding: 10px; background: #f0f8e8; border-radius: 6px; font-size: 13px;">
            <strong>📋 Steps:</strong>
            <ol style="margin: 8px 0 0 20px;">
              ${suggestion.steps.map(step => `<li>${t(step)}</li>`).join('')}
            </ol>
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  // Explainability
  html += `
    <div class="explainability-panel">
      <div class="explainability-header" onclick="toggleExpand(this.nextElementSibling)">
        <span>❓ Why this risk level? How was it calculated?</span>
        <span class="explainability-toggle">▼</span>
      </div>
      <div class="explainability-content">
        <p><strong>Risk Calculation Formula:</strong></p>
        <p style="font-family: monospace; background: #f0f8e8; padding: 10px; border-radius: 6px; margin: 10px 0; font-size: 13px;">
          Base Risk (10%) +<br>
          Storage Type Factor (${STORAGE_TYPES[analysis.storageType] ? '+15-40%' : '+20%'}) +<br>
          Transport Time Factor (${analysis.transportTime > 5 ? '+20-30%' : '+0-15%'}) +<br>
          Temperature Impact (${analysis.temperature > 30 ? '+15%' : analysis.temperature > 25 ? '+8%' : '+5%'})
        </p>
        
        <p style="margin-top: 12px;"><strong>🌡️ Temperature Impact Breakdown:</strong></p>
        <ul style="margin-left: 20px; margin-top: 8px;">
          <li><strong>&lt;10°C:</strong> Risk of chilling injury (+5%)</li>
          <li><strong>10-25°C:</strong> Optimal range (minimal impact)</li>
          <li><strong>25-30°C:</strong> Moderate growth of microbes (+8%)</li>
          <li><strong>&gt;30°C:</strong> Rapid spoilage (+15%)</li>
        </ul>
        
        <p style="margin-top: 12px;"><strong>🚛 Transport Time:</strong> Every hour increases risk as microbes multiply. Night transport (cooler) reduces this significantly.</p>
        
        <div class="data-source" style="margin-top: 12px;">
          <div class="data-source-title">📊 Based on:</div>
          <p style="font-size: 13px; margin: 6px 0;">
            ✓ Storage condition standards<br>
            ✓ Microbial growth rates<br>
            ✓ Industry spoilage data<br>
            ✓ Temperature sensitivity of crops
          </p>
        </div>
        
        <div class="confidence-display confidence-${analysis.confidence > 80 ? 'high' : analysis.confidence > 50 ? 'medium' : 'low'}">
          ✓ Confidence: ${analysis.confidence}%
        </div>
      </div>
    </div>
    
    <button class="btn btn-primary" style="margin-top: 20px;" onclick="window.location.href='index.html'">
      ← Back to Home
    </button>
  `;
  
  container.innerHTML = html;
  container.style.display = 'block';
}

/* ==========================================
   Page Initialization
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Determine which page we're on and initialize accordingly
  const path = window.location.pathname;
  
  if (path.includes('harvest')) {
    initHarvestPage();
  } else if (path.includes('market')) {
    initMarketPage();
  } else if (path.includes('spoilage')) {
    initSpoilagePage();
  }
  
  // Update language display
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.textContent = currentLanguage === 'en' ? 'हिंदी' : 'English';
  }
});
