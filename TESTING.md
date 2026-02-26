# Earthworm - Testing Checklist & Quality Assurance

## 🧪 Pre-Release Testing

### 1. Functional Testing

#### Home Page (index.html)
- [ ] Page loads without errors
- [ ] Logo displays correctly
- [ ] Language toggle button visible
- [ ] Voice button visible
- [ ] All 3 action buttons clickable
- [ ] Colors appear as designed
- [ ] Links navigate correctly
- [ ] Hero section displays properly
- [ ] Weather widget shows data
- [ ] Market update widget shows data

#### Harvest Advice Page (harvest.html)
- [ ] Form loads with all fields
- [ ] Dropdown shows all 8 crops
- [ ] Date picker works
- [ ] Text input accepts location
- [ ] Form validation works (required fields)
- [ ] Submit button triggers analysis
- [ ] Results display after submission
- [ ] Results show all required sections
- [ ] Expandable "Why" section works
- [ ] Back button navigates correctly
- [ ] Saved data persists on reload

#### Market Page (market.html)
- [ ] Form loads correctly
- [ ] Crops dropdown populated
- [ ] Location field accepts input
- [ ] Submit button works
- [ ] Markets sorted by profit
- [ ] Best market has ⭐ indicator
- [ ] All 3 markets display
- [ ] Distance calculation shows
- [ ] Transport time shows
- [ ] Net profit calculation correct
- [ ] Data explanation panel works

#### Spoilage Page (spoilage.html)
- [ ] Form loads with 3 fields
- [ ] Storage type dropdown works
- [ ] Transport time accepts number
- [ ] Temperature accepts number
- [ ] Submit triggers analysis
- [ ] Risk percentage displays
- [ ] Risk level badge shows correct color
- [ ] 4 suggestions ranked correctly
- [ ] Each suggestion shows cost/impact
- [ ] Steps display for each option
- [ ] Explainability panel works
- [ ] Confidence score shown

### 2. Data Validation Testing

#### Input Validation
```javascript
// Test each input field with:
- Empty field (should show error)
- Valid data (should accept)
- Invalid data (should validate)
- Special characters (should handle)
- Very long input (should truncate?)
```

**Test Cases:**
| Input | Value | Expected |
|-------|-------|----------|
| Crop | (empty) | Error: Select crop |
| Date | 2026-02-31 | Accept but warn invalid date |
| Location | "Delhi123" | Accept |
| Temp | -50 | Accept (edge case) |
| Temp | 60 | Accept (hot climate) |
| Transport | 0 | Accept (direct sale) |
| Transport | 100 | Accept (very far) |

#### Form Persistence
- [ ] Navigating away and returning to harvest page shows saved data
- [ ] Market form remembers last search
- [ ] Spoilage form shows last entered values
- [ ] Language preference persists across pages
- [ ] Closing tab and reopening shows saved state

### 3. Calculation Verification

#### Harvest Window Calculation
```javascript
// Wheat example
Sowing: 2025-10-15
Expected Harvest: 2026-03-25 (165 days)

Test:
- Sowing date today = Harvest should be 165 days from today
- Sowing date in past = Days remaining should be calculated
- Sowing date in future = Show negative days warning
```

#### Market Profit Calculation
```javascript
// Formula: Price - Transport Cost - Spoilage Loss

Price: 2500
Transport Cost: 200
Spoilage Loss (at 10%): 250
Expected Profit: 2050

Test different combinations:
- High price, low cost = High profit
- Low price, high cost = Low profit
- Show ranking correct
```

#### Spoilage Risk Calculation
```javascript
// Formula: 10 + storage_factor + transport_factor + temp_factor

Test:
- All optimal conditions = Low risk (20-30%)
- All worst conditions = High risk (70-80%)
- Medium conditions = Medium risk (40-50%)
```

### 4. UI/UX Testing

#### Responsive Design
Test on different screen sizes:
- [ ] 320px (Small phone)
- [ ] 375px (iPhone 6-8)
- [ ] 414px (iPhone X)
- [ ] 480px (Large phone)
- [ ] 768px (Tablet portrait)
- [ ] 1024px (Tablet landscape)
- [ ] 1366px (Desktop)

**What to check:**
- Text readable on all sizes
- Buttons large enough to tap
- No horizontal scrolling
- Forms stack properly
- Images scale correctly
- Layout doesn't break

#### Touch Interaction
Test on actual mobile device:
- [ ] Buttons respond to single tap
- [ ] No double-tap zoom needed
- [ ] Dropdowns open properly
- [ ] Scrolling is smooth
- [ ] No lag when scrolling lists
- [ ] Keyboard doesn't cover form
- [ ] Tabs between fields work

#### Visual Consistency
- [ ] Colors match design spec (see css/style.css)
- [ ] Typography consistent
- [ ] Button styles match
- [ ] Card styling uniform
- [ ] Spacing consistent
- [ ] Icons display correctly
- [ ] Emojis render properly

### 5. Language & Localization Testing

#### English Mode
- [ ] All text appears in English
- [ ] Language toggle button shows "हिंदी"
- [ ] Crop names in English
- [ ] Instructions clear in English

#### Hindi Mode
- [ ] All text appears in Hindi (where available)
- [ ] Language toggle button shows "English"
- [ ] Crop names in Hindi
- [ ] Instructions clear in Hindi

#### Translation Quality
- [ ] No untranslated strings visible
- [ ] Text doesn't overflow after translation
- [ ] Proper Hindi fonts display
- [ ] Numbers display correctly in both languages

### 6. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab key navigates all buttons
- [ ] Enter key activates buttons
- [ ] Escape closes modals
- [ ] Can fill forms without mouse

#### Color Contrast
- [ ] Text on buttons readable
- [ ] Risk indicators distinguishable
- [ ] Colors don't rely on hue alone
- [ ] Works for colorblind users

#### Font Sizes
- [ ] Headlines large (24px+)
- [ ] Body text readable (16px+)
- [ ] Labels clear and bold
- [ ] Subtext provides context

#### Screen Reader (if applicable)
- [ ] Page structure logical
- [ ] Form labels associated
- [ ] Errors announced
- [ ] Buttons labeled clearly

### 7. Performance Testing

#### Load Time
- [ ] Home page loads < 2 seconds
- [ ] Each result page < 1 second
- [ ] No lag when switching pages
- [ ] Smooth animations (60fps)

**Test using:**
- Browser DevTools (Network tab)
- Testing on slow 3G connection
- Testing on older Android phone

#### File Sizes
- [ ] index.html < 20KB
- [ ] style.css < 100KB
- [ ] data.js < 50KB
- [ ] utils.js < 30KB
- [ ] main.js < 40KB
- Total < 250KB

#### Network Usage
- [ ] Works offline with demo data
- [ ] No unnecessary requests
- [ ] No external dependencies loaded
- [ ] Graceful degradation if offline

### 8. Browser Compatibility

Test on minimum supported:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 50+ | ✓ |
| Firefox | 45+ | ✓ |
| Safari | 11+ | ✓ |
| Edge | 15+ | ✓ |
| Opera | 37+ | ✓ |
| Samsung Internet | 5+ | ✓ |
| UC Browser | Latest | ? |

**What to verify:**
- [ ] Page renders correctly
- [ ] Forms work
- [ ] Page transitions work
- [ ] No console errors
- [ ] Voice input if supported

### 9. Mobile Device Testing

Test on actual devices if possible:

**Android:**
- [ ] OnePlus 6T (2018, high-end)
- [ ] Redmi 5A (2018, budget)
- [ ] Galaxy A10 (2019, budget)
- [ ] Samsung Galaxy S9 (2018, high-end)

**iPhone:**
- [ ] iPhone 6S (older device)
- [ ] iPhone X or newer

**What to test:**
- [ ] Everything loads
- [ ] Typography readable
- [ ] Touch works smoothly
- [ ] No crashes or freezes
- [ ] Battery drain acceptable
- [ ] Memory usage OK (< 50MB)

### 10. Data Security Testing

#### Local Storage
- [ ] Data stays in localStorage
- [ ] No data sent to servers
- [ ] Clear drafts option works
- [ ] No sensitive data exposure

#### Input Sanitization
- [ ] No script injection possible
- [ ] HTML special chars handled
- [ ] No SQL injection risk (localStorage only)

#### Privacy
- [ ] No tracking code
- [ ] No analytics
- [ ] No third-party requests
- [ ] Privacy-friendly

### 11. Edge Case Testing

Test unusual scenarios:

| Case | Input | Expected Result |
|------|-------|-----------------|
| Future sowing date | 2026-12-31 | Handle gracefully |
| Very old sowing date | 2020-01-01 | Show reasonable harvest |
| Extreme temperature | -50°C | Accept but warn |
| Extreme temperature | 60°C | Accept and show high risk |
| Zero transport time | 0 hours | Show local market |
| Very far mandi | 1000 km | Calculate high cost |
| All same price | All ₹2500 | Use distance to rank |
| Rapid spoilage | 90%+ risk | Show urgent warning |

### 12. User Acceptance Testing

#### Farmer Perspective Testing
Ask actual farmers to test:
- [ ] Is the interface easy to understand?
- [ ] Are instructions clear?
- [ ] Is the advice helpful?
- [ ] Would they use it again?
- [ ] Is it trustworthy?
- [ ] Do they trust the suggestions?
- [ ] Would they pay for this?
- [ ] What's missing?

#### Feedback Questions
1. What was most confusing?
2. What was most helpful?
3. Would you change anything?
4. Would you recommend to other farmers?
5. What features would you add?
6. Is the language appropriate?
7. Are the colors OK?
8. Are buttons easy to tap?

### 13. Error Handling Testing

#### Simulate Failures
- [ ] Close browser while loading
- [ ] Turn off internet mid-operation
- [ ] Enter invalid date format
- [ ] Fill form with special chars
- [ ] Click submit multiple times
- [ ] Refresh during operation
- [ ] Clear browsing data
- [ ] Low memory scenario

**Each should:**
- Show user-friendly error message
- Not crash the app
- Allow recovery
- In Hindi if selected

### 14. Localization for Real Deployment

For each state/region, verify:
- [ ] Correct crops for region
- [ ] Local mandi names
- [ ] Regional language support
- [ ] Local calendar if different
- [ ] Regional units (if any)

---

## 📋 Test Execution Plan

### Phase 1: Development Testing (Ongoing)
- Developer runs all tests locally
- Every feature tested before commit
- Console errors fixed immediately

### Phase 2: QA Testing (1 week)
- Formal test case execution
- All 14 areas tested
- Bugs logged with severity

### Phase 3: User Testing (2 weeks)
- 10-50 farmers test app
- Feedback recorded
- Critical issues fixed

### Phase 4: Production Testing (1 week)
- Final checks
- Performance monitoring setup
- Backup systems verified

---

## 🐛 Bug Report Template

When you find an issue, report it as:

```
Title: [Page] Brief description

Severity: 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low

Steps to Reproduce:
1. Open [page]
2. Fill in [field] with [value]
3. Click [button]
4. See issue

Expected:
[What should happen]

Actual:
[What actually happens]

Environment:
- Device: [Phone/Tablet/Desktop]
- Browser: [Chrome/Firefox/Safari]
- OS: [Android/iOS/Windows]
- Version: [Version number]

Screenshots: [Attach if possible]

Console Error: [Paste error from F12]
```

---

## ✅ Release Checklist

Before launching:

- [ ] All 14 test areas passed
- [ ] No critical bugs remaining
- [ ] Code reviewed
- [ ] Documentation complete
- [ ] README written
- [ ] ARCHITECTURE documented
- [ ] QUICKSTART guide ready
- [ ] Support plan in place
- [ ] Backup system ready
- [ ] Monitoring enabled
- [ ] Performance acceptable
- [ ] Mobile testing done
- [ ] Accessibility checked
- [ ] Security audit passed
- [ ] Privacy verified

---

## 📊 Test Metrics

Track these metrics:

| Metric | Target | Method |
|--------|--------|--------|
| Code Coverage | >80% | Jest/Coverage tool |
| Performance | <2s load | DevTools |
| Accessibility | WCAG AA | axe DevTools |
| Mobile Support | 95%+ phones | Manual testing |
| Bug Escape Rate | <5% | Post-release monitoring |

---

## 🎯 Success Criteria

The app is ready to release when:

1. ✓ All 14 test areas pass
2. ✓ Zero critical bugs
3. ✓ Zero high-severity bugs
4. ✓ Works on target devices
5. ✓ Loads in < 2 seconds
6. ✓ Users find it helpful
7. ✓ Farmers trust recommendations
8. ✓ No crashes in 1 hour of use
9. ✓ All languages work
10. ✓ Accessible to all users

---

## 📞 Testing Support

For help setting up tests:
- See QUICKSTART.md for demo walkthrough
- See ARCHITECTURE.md for technical details
- Check inline code comments
- Test error messages in browser console

---

**Happy Testing! 🧪🌾**
