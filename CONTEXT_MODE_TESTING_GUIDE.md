# 🧠 Context Mode Testing Guide

## How to Test Context Mode Features

### 🚀 **Quick Start Testing**

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open Browser and Check Console**
   - Open Developer Tools (F12)
   - Go to Console tab to see debug messages
   - Navigate to a conversation page

### 📝 **Step-by-Step Feature Testing**

#### **Step 1: Enable Context Mode**
1. Look for the **brain icon** 🧠 in the conversation header
2. Click it - it should transform to **sparkles icon** ✨ with a gradient background
3. **Expected behavior**: Icon changes, glows, and shows "Context Mode ON" tooltip
4. **Console should show**: Debug messages about context mode being enabled

#### **Step 2: Test Manual Context Trigger (Wand Icon)**
1. With Context Mode ON, look for the **wand icon** 🪄 near the message input
2. Click the wand icon
3. **Expected behavior**:
   - Console shows: "Manual trigger clicked!"
   - Toast shows: "Analyzing conversation..."
   - Icon shows loading spinner
   - After analysis: Toast shows results or "No relevant suggestions found"

#### **Step 3: Test Auto-Complete While Typing**
1. Enable Context Mode
2. Click in the message input field
3. Type at least 3 characters (e.g., "how are", "what do", "when can")
4. **Expected behavior**:
   - Auto-complete popup appears above input
   - Shows contextual suggestions
   - Click any suggestion to use it

#### **Step 4: Test Message Suggestions Popup**
1. Enable Context Mode
2. Have someone else send a message (or send from another device/tab)
3. **Expected behavior**:
   - Popup appears in bottom-right corner
   - Shows 2-4 suggested replies
   - Auto-dismisses after 10 seconds

### 🐛 **Debugging Common Issues**

#### **Issue: Manual Trigger Does Nothing**
1. Check Console for error messages
2. Verify Context Mode is enabled (sparkles icon)
3. Check if API key is configured:
   ```bash
   # Add to .env.local file:
   GEMINI_API_KEY=your_api_key_here
   ```

#### **Issue: Auto-Complete Not Showing**
1. Ensure Context Mode is ON
2. Type at least 3 characters
3. Try common phrases: "how are", "what do", "when can"
4. Check Console for errors

#### **Issue: No AI Suggestions**
1. Check conversation has at least 2 messages
2. Messages should contain trigger words like:
   - "what", "how", "when", "help", "think"
   - "meeting", "schedule", "task", "project"
3. Check Console for API errors

### 🔍 **Console Debug Messages to Look For**

```javascript
// Context Mode enabled
"analyzeContext called: {force: true, isContextModeEnabled: true, ...}"

// Manual trigger clicked
"Manual trigger clicked!"

// API requests
"Making API request to /api/ai-chat..."
"API response status: 200"

// Analysis results
"Analysis result: {topic: '...', actions: [...]}"
"Found X AI suggestions!"

// Context worthiness check
"Checking context worthiness: {messageCount: 3, hasKeywords: true}"
```

### 🧪 **Test Scenarios**

#### **Scenario 1: Meeting Discussion**
1. Send messages like:
   - "Can we schedule a meeting tomorrow?"
   - "What time works for everyone?"
2. Click manual trigger
3. Should suggest: scheduling responses, time questions

#### **Scenario 2: Project Planning**
1. Send messages like:
   - "We need to work on the project"
   - "When is the deadline?"
2. Should suggest: task division, progress updates

#### **Scenario 3: General Questions**
1. Send messages like:
   - "What do you think about this?"
   - "How should we proceed?"
2. Should suggest: agreement responses, follow-up questions

### ⚡ **Quick Fixes for Common Problems**

#### **If Nothing Works:**
1. Check browser console for errors
2. Verify API key in `.env.local`
3. Restart development server
4. Clear browser cache

#### **If Auto-Complete Doesn't Show:**
```typescript
// Check in Console:
document.querySelector('[data-testid="auto-complete"]') // Should exist when typing
```

#### **If Manual Trigger Doesn't Respond:**
```typescript
// Check in Console:
document.querySelector('[data-testid="manual-trigger"]').click() // Should log "Manual trigger clicked!"
```

### 📊 **Expected Success Indicators**

✅ **Context Mode Toggle**: Icon changes from brain to sparkles with glow  
✅ **Manual Trigger**: Shows loading, then toast with results  
✅ **Auto-Complete**: Popup appears while typing  
✅ **Message Suggestions**: Popup after receiving messages  
✅ **Console Logs**: Debug messages appear throughout  
✅ **API Calls**: Network tab shows successful /api/ai-chat requests  

### 🎯 **Performance Expectations**

- **Context Mode Toggle**: Instant response
- **Manual Trigger**: 2-5 seconds for AI analysis
- **Auto-Complete**: Appears immediately while typing
- **Message Suggestions**: Appears within 1 second of receiving message
- **API Response**: 3-10 seconds depending on conversation complexity

---

## 🛠 **Developer Testing Commands**

```bash
# Check for TypeScript errors
npm run build

# Start development with verbose logging
npm run dev

# Check API endpoint directly
curl -X POST http://localhost:3000/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Analyze this: Hello, how are you today?"}'
```

## 📱 **Mobile Testing**

- Auto-complete should be responsive
- Touch interactions should work
- Popups should not interfere with keyboard
- All tooltips should be accessible

---

**Need Help?** Check the browser console first - all features log their activity for debugging!
