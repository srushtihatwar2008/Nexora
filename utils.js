/* ==========================================
   Earthworm - Utility Functions
   ========================================== */

// Language management
let currentLanguage = 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('earthworm_lang', lang);
  updatePageLanguage();
}

function getLanguage() {
  return currentLanguage || localStorage.getItem('earthworm_lang') || 'en';
}

function t(key, defaultText = '') {
  // Simple translation system
  return typeof key === 'object' && key[currentLanguage] ? key[currentLanguage] : defaultText;
}

function updatePageLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      // This is a placeholder - can be extended with full i18n system
    }
  });
  setTimeout(() => location.reload(), 100);
}

// Voice input handling
let isListening = false;
let recognition;

function initializeVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    
    recognition.onstart = function() {
      isListening = true;
      const voiceBtn = document.querySelector('.voice-btn');
      if (voiceBtn) {
        voiceBtn.style.background = '#d84a4a';
      }
    };
    
    recognition.onend = function() {
      isListening = false;
      const voiceBtn = document.querySelector('.voice-btn');
      if (voiceBtn) {
        voiceBtn.style.background = '#89c540';
      }
    };
    
    recognition.onerror = function(event) {
      console.log('Voice error:', event.error);
    };
  }
}

function startVoiceInput() {
  if (recognition && !isListening) {
    recognition.start();
  } else {
    alert(currentLanguage === 'hi' ? 'आपके डिवाइस में वॉइस सुविधा नहीं है' : 'Voice input not supported on your device');
  }
}

// Location handling
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.log('Location error:', error);
          resolve({ latitude: null, longitude: null });
        }
      );
    } else {
      resolve({ latitude: null, longitude: null });
    }
  });
}

// Date utilities
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getDateString(dateObj) {
  if (typeof dateObj === 'string') return dateObj;
  return dateObj.toISOString().split('T')[0];
}

// UI Helpers
function showNotification(message, type = 'info') {
  // Creates a temporary notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 70px;
    right: 20px;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function toggleExpand(element) {
  element.classList.toggle('open');
}

// Form validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#d84a4a';
      isValid = false;
    } else {
      input.style.borderColor = '#bdc3c7';
    }
  });
  
  return isValid;
}

// Local storage utilities
function saveToDraft(key, data) {
  try {
    localStorage.setItem(`earthworm_${key}`, JSON.stringify(data));
  } catch (e) {
    console.log('Storage error:', e);
  }
}

function loadFromDraft(key) {
  try {
    const data = localStorage.getItem(`earthworm_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log('Load error:', e);
    return null;
  }
}

function clearAllDrafts() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('earthworm_'));
  keys.forEach(k => localStorage.removeItem(k));
}

// Navigation
function navigateTo(page) {
  window.location.href = page;
}

function goBack() {
  window.history.back();
}

// Print utility
function printAdvice(title) {
  window.print();
}

// Mock voice announcement
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    speechSynthesis.speak(utterance);
  }
}

// Color theme utilities
function getRiskColor(riskLevel) {
  const colors = {
    'Low': '#27ae60',
    'Medium': '#f5b041',
    'High': '#d84a4a'
  };
  return colors[riskLevel] || '#2c3e50';
}

// Animation utilities
function addSlideInAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize with page load
document.addEventListener('DOMContentLoaded', function() {
  currentLanguage = getLanguage();
  initializeVoiceInput();
  addSlideInAnimation();
  
  // Setup language toggle
  const langToggleBtn = document.querySelector('.lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function() {
      const newLang = currentLanguage === 'en' ? 'hi' : 'en';
      setLanguage(newLang);
    });
  }
  
  // Setup voice button
  const voiceBtn = document.querySelector('.voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', startVoiceInput);
  }
});

// Error handling
window.addEventListener('error', function(event) {
  console.error('Error:', event.error);
});

// Offline detection
window.addEventListener('offline', function() {
  showNotification(currentLanguage === 'hi' ? 'आप ऑफलाइन हैं' : 'You are offline', 'warning');
});

window.addEventListener('online', function() {
  showNotification(currentLanguage === 'hi' ? 'आप ऑनलाइन हैं' : 'You are back online', 'success');
});
