# 📚 Safa Reads — Learn to Read!

> **A fun reading practice app for children ages 5-8**

---

## 🌟 What is Safa Reads?

Safa Reads is a colorful, fun app that helps young children learn to read! 

**Here's how it works:**
- Words like "cat", "dog", "play" appear scattered on the screen
- Your child taps a word
- The app says the word out loud
- The word gets a checkmark ✓ when read
- After all words are read — a celebration! Fresh new words appear

**No reading required!** Your child just taps and listens. Perfect for children ages 5-8 who are just starting to learn words.

---

## 📦 What You Need Before Starting

- A computer (Windows or Mac)
- Internet connection (only for first-time setup)
- About 20 minutes of your time
- Optional: A tablet or phone for your child (works on iPad/tablet too!)

---

## 🛠️ Setting Up Your Computer (One-Time Setup)

### Step A: Install Node.js (Free Program)

Node.js is a free program that lets your computer run this app. Think of it like installing Microsoft Word — you only do it once!

**On Windows:**
1. Open Chrome, Edge, or Safari
2. Go to: **https://nodejs.org**
3. Click the big green button that says "LTS" (left side)
4. Open the downloaded file (looks like a box installer)
5. Click "Next" or "Continue" through all the screens
6. Click "Install" — it may ask for your password
7. Wait for it to finish and click "Finish"

**On Mac:**
1. Go to: **https://nodejs.org**
2. Click the big green "LTS" button
3. Open the downloaded file
4. Drag the box icon into the "Applications" folder
5. Enter your password when asked

**How to know it worked:**
- Open Command Prompt (Windows) or Terminal (Mac)
- Type: `node --version`
- Press Enter
- You should see a number like "v20.x.x" — that's success! ✅

---

### Step B: Download the App

1. Go to where you saved this project
2. Right-click the folder
3. Click "Extract All" (Windows) or double-click (Mac)
4. Save it to your Desktop so it's easy to find

---

### Step C: Open the Command Prompt

The Command Prompt is a window where you type instructions to your computer. Don't worry — it's easier than it sounds!

**On Windows:**
1. Press the Windows key (flag key) on your keyboard
2. Type: `cmd`
3. Press Enter
4. A black window will appear with white text

**On Mac:**
1. Press Command + Space (the key with the magnifying glass)
2. Type: `Terminal`
3. Press Enter
4. A white or black window will appear

---

### Step D: Go to the App Folder

This tells your computer "I want to work inside this app folder."

1. In the Command Prompt, type:
   ```
   cd Desktop\safa-read-app
   ```
   **(Windows)** 

   OR 

   ```
   cd Desktop/safa-read-app
   ```
   **(Mac)**

2. Press Enter
3. You should see your folder name at the prompt — success! ✅

---

### Step E: Install Helper Files

The app needs some small helper files to work. This is like getting ingredients before cooking!

1. Type: `npm install`
2. Press Enter
3. You'll see lots of text scrolling — that's normal! Wait for it to stop.
4. When you see your prompt again (no errors), you're done! ✅

---

## ▶️ Starting the App

1. Type: `npm start`
2. Press Enter
3. You'll see a message like:

```
🚀 Safa Read App is running!

📱 Local:    http://localhost:3000
💻 Network:  http://192.168.x.x:3000
```

🎉 The app is running! Keep this window open (don't close it!)

---

## 🌐 Opening the App

**On YOUR computer:**
1. Open Chrome or Edge
2. In the address bar, type: `http://localhost:3000`
3. Press Enter
4. The app appears with colorful words! ✅

**On your child's tablet/phone:**
1. Make sure the tablet and your computer are on the **same WiFi**
2. Look at the Command Prompt window — find the line that says "Network:" or "IP:"
3. It will look something like: `http://192.168.1.5:3000`
4. Write down those numbers (everyone's are different!)
5. On your tablet's browser, type exactly those numbers
6. Press Enter — the app appears! ✅

---

## 📱 Installing on Your Child's Device

### On iPhone or iPad:
1. Open Safari
2. Go to the app (using the address from above)
3. Tap the **Share** button (square with an arrow sticking out)
4. Tap **"Add to Home Screen"**
5. Tap "Add"
6. Now there's a colorful "Safa Reads" icon on the home screen! ✅

### On Android (Samsung, Google Pixel, etc.):
1. Open Chrome
2. Go to the app (using the address from above)
3. Tap the three dots (menu)
4. Tap **"Install app"** or **"Add to Home Screen"**
5. Tap "Install"
6. The "Safa Reads" icon now appears in your apps! ✅

---

## 🔌 Fully Offline Mode — Works Without WiFi or Laptop! 🌍

**The amazing part:** Once installed on your child's device, this app works COMPLETELY OFFLINE. No WiFi needed. No laptop needed. No internet needed!

### What's Included Offline
- 📚 **1,748 words** built into the app
- 🎨 **5 categories**: Animals, Colors, Food, Family, Numbers
- 👶 **Ages 5-8** word sets
- 🗣️ Text-to-speech (browser's built-in voice)
- 📊 Progress tracking (saved on device)
- 🎉 Celebration animations

### How to Set Up Offline Mode (One-Time)

1. **Connect** your tablet/phone to the same WiFi as the computer
2. **Open** the app in the browser
3. **Wait** for it to fully load (about 10 seconds)
4. **Install** as a PWA (see instructions above for iPhone/Android)
5. **Open** the installed app while still on WiFi
6. ✅ **Done!** Now WiFi can be off, laptop can be closed — the app still works!

### Test Offline Mode

Want to verify it works offline?

1. Turn OFF your computer completely
2. Turn OFF WiFi on the tablet/phone
3. Open "Safa Reads" from the home screen
4. ✅ The app opens with words!
5. Tap a word — it speaks aloud!
6. Click "New Words" — fresh words appear!

### What Works Offline
- ✅ All word displays and categories
- ✅ Tapping words to hear them spoken
- ✅ "New Words" button
- ✅ Progress tracking (saved to device)
- ✅ Age and category selection
- ✅ Celebration when all words are read

### When You DO Need WiFi/Laptop
Only when:
- First installing the PWA
- Updating to a new app version
- Viewing dashboard stats (optional, limited)

---

## 🚀 Deploying to Netlify (Free) — No Laptop Needed!

If you want the app to work on any device WITHOUT needing your laptop running, you can deploy it to Netlify. This is a free website hosting service that makes the app available on a permanent URL.

### Why Netlify?

- **100% Free** — No credit card needed
- **Works on any device** — Open the URL in Chrome/Safari and it works
- **Offline support** — Once installed, works WITHOUT internet
- **Permanent URL** — Get a link like `safa-reads.netlify.app` that works forever

### Before Uploading — Check Your Files

Make sure these files exist in your project **public folder**:

1. **public/data/word-bank.json** — The main word list (1,748 words)
2. **public/data/categories.json** — Category words (Animals, Colors, etc.)
3. **public/data/sight-words.json** — Age-based sight words (ages 5-8)
4. **public/assets/icons/** — All icon files (icon-192.png, icon-512.png, etc.)

> **Note:** For Netlify to work, you must copy `categories.json` and `sight-words.json` from the `data/` folder into `public/data/` before uploading. The app loads these files differently when running on Netlify.

### Step 1: Go to Netlify

1. Open your browser (Chrome, Edge, or Safari)
2. Go to: **https://netlify.com**
3. Click **"Sign up"**
4. Choose **"GitHub"** or **"Email"** to create an account
5. Follow the steps to verify your email

### Step 2: Upload the App

1. On Netlify, look for the **"Drag and drop"** area on the main page
2. Open another window and find your project's **public/** folder
3. Drag the entire **public/** folder onto the Netlify drop area
4. Wait for it to upload (may take 30-60 seconds)
5. Netlify will show you a URL like: `random-name-12345.netlify.app`

**That's your permanent app URL!** Save it somewhere safe.

### Step 3: Install on Android Tablet

1. On your Android tablet, open **Chrome**
2. Go to your Netlify URL (example: `safa-reads.netlify.app`)
3. Wait for the app to load completely (about 10 seconds)
4. Use the app for 30 seconds (tap some words)
5. Tap the three dots (Chrome menu)
6. Tap **"Install app"** or **"Add to Home Screen"**
7. Tap **"Install"**
8. The "Safa Reads" icon now appears on your home screen!

### Step 4: Verify Offline Works

Let's make sure everything is cached:

1. **Keep WiFi ON** for now
2. Open the installed app from your home screen
3. Tap a few words to hear them speak
4. Tap "New Words" to get fresh words

Now test offline:

5. Turn **OFF WiFi** on your tablet
6. Open "Safa Reads" from your home screen
7. ✅ The app should open with words!
8. Tap a word — it still speaks!
9. Tap "New Words" — fresh words appear!

**If words don't appear:** Wait longer while connected to WiFi next time, then try again.

### Step 5: Updating the App

When you make changes to the app:

1. Make a new export of your **public/** folder
2. Go to your Netlify site
3. Click the **"Deploys"** tab
4. Drag the updated **public/** folder onto the drop area
5. Wait for it to upload and deploy

**Important: Bump the Cache Version**

Every time you change `service-worker.js`, you MUST update the version number:

1. Open **public/service-worker.js**
2. Find the line that says: `const CACHE_NAME = 'safa-reads-offline-v3';`
3. Change it to: `const CACHE_NAME = 'safa-reads-offline-v4';` (increment the number!)
4. Save the file
5. Re-upload to Netlify

This ensures users get the new files instead of old cached ones.

---

## 🎮 How to Use the App (For Parents)

### Settings (Hidden Behind the Arrow)

1. Click the small **`›`** arrow at the top-left corner
2. A menu slides out! You can:
   - **Choose age**: 5, 6, 7, or 8 (words change based on age)
   - **Pick category**: Animals 🐶, Colors 🎨, Food 🍎, Family 👨‍👩‍👧, Numbers 🔢
   - **New Words**: Click for fresh words
   - **Dashboard**: See your child's reading progress
   - **Install**: Add the app to your device
3. Click the arrow again to hide the menu

### While Using the App

- Words appear in fun colors scattered on the screen
- Your child taps any word
- The app says the word out loud (text-to-speech)
- The word fades slightly and gets a green checkmark ✓
- After ALL words are read — 🎉 "Amazing!" message appears
- New words automatically load!

---

## 👧 How Your Child Uses It

**No help needed!** Your child can:

1. Look at the colorful words on screen
2. Tap any word they want
3. Hear the word spoken out loud
4. See it get a checkmark
5. Keep tapping until all words are done
6. Celebrate! 🎉
7. New words appear automatically!

It's that simple! Perfect for kids who are learning to read.

---

## 🆘 Common Problems & Solutions

### ❌ "npm is not recognized" or "command not found"

**Problem:** Node.js didn't install correctly.

**Solution:**
1. Close the Command Prompt
2. Restart your computer (yes, really!)
3. Try installing Node.js again from **https://nodejs.org**
4. Make sure to click the "LTS" button (the bigger green one)

---

### ❌ The app doesn't open on my child's tablet

**Check three things:**

1. **Is the app running?** 
   - Look at your computer — is the Command Prompt window open?
   - If you closed it, the app isn't running!
   - Open Command Prompt → `cd Desktop\safa-read-app` → `npm start`

2. **Is the tablet on the same WiFi?**
   - Both your computer and tablet need to be on THE SAME WiFi network
   - Check your tablet's WiFi settings

3. **Did you type the address correctly?**
   - It should look like: `http://192.168.1.5:3000` (your numbers will be different!)
   - Every WiFi network is slightly different

---

### ❌ App says "Offline mode" — but I want to use it!

**That's fine!** "Offline mode" is actually a good thing! It means:

- The app is working WITHOUT needing your laptop or WiFi
- Your child can keep using it right now
- All features work normally

If you see this message:
- You can keep using the app normally
- The server/laptop is not needed
- "New Words" will still give you fresh words from the built-in word bank

To get back online mode:
- Make sure your tablet has WiFi turned on
- Reconnect to the same WiFi as your computer
- Refresh the page

---

### ❌ Words won't load in offline mode

**Rare fix:**

1. First, make sure you successfully installed as a PWA (see "Installing on Your Child's Device" section)
2. Open the app while connected to WiFi first
3. Let it fully load (wait 10 seconds)
4. Then it will cache and work offline

---

### ❌ I closed the Command Prompt and now the app won't work

**That's okay!**

1. Open Command Prompt
2. Type: `cd Desktop\safa-read-app`
3. Press Enter
4. Type: `npm start`
5. Press Enter
6. The app starts again! ✅

---

### ❌ My child taps a word but doesn't hear anything

**Check:**
1. Is the volume turned up on the device?
2. Is the browser's sound not muted?
3. Try refreshing the page (tap refresh or press F5)

---

### ❌ How do I stop the app?

1. In the Command Prompt window
2. Press and hold **Ctrl** + **C** (Control + C)
3. The window will show you the prompt again
4. You can now close the window

---

### ❌ How do I start it again tomorrow?

Quick three-step restart:

1. Open Command Prompt
2. Type: `cd Desktop\safa-read-app` → Press Enter
3. Type: `npm start` → Press Enter
4. Open browser → Go to `http://localhost:3000`

---

## 📚 Glossary (Simple Words)

**App:** A program on your phone or computer, like Instagram or YouTube.

**Browser:** The program you use to visit websites. Chrome, Safari, and Edge are browsers.

**Command Prompt / Terminal:** A window where you type instructions to your computer instead of clicking.

**Node.js:** A free program that lets your computer run special apps like this one.

**npm:** A helper that comes with Node.js to download small files the app needs.

**Localhost:** Your own computer. `http://localhost:3000` means "the app on THIS computer."

**IP Address:** Your computer's "phone number" on your home WiFi. It helps other devices find your computer.

**WiFi:** Your wireless internet at home that lets devices talk to each other.

**PWA (Progressive Web App):** A website that acts like a phone app — you can install it on the home screen!

**Word Bank:** The collection of 1,748 words built directly into the app. No internet needed to get words!

**Offline Mode:** When the app works without WiFi or laptop. Uses cached words from the device.

**Cache / Cached:** A copy of the app stored on your device. This is how it works offline!

**Install (PWA):** Saving the app to your home screen so it works like a real app.

---

## 💝 About This App

This app was created by a parent for their daughter Safa to help her learn to read in a fun, interactive way!

**It's completely:**
- ✅ Free to use
- ✅ No ads
- ✅ No sign-ups required
- ✅ Safe for children
- ✅ Private (no data collected)

---

## 📞 Need More Help?

If you get stuck and this guide didn't help:

1. Make sure you followed ALL the steps in order
2. Restart your computer and try again
3. Google the exact error message

**There are no silly questions!** If something isn't working, ask for help!

---

## ✅ Quick Start (For Returning Users)

If you already set it up before and just want to start the app:

1. Open Command Prompt
2. Type: `cd Desktop\safa-read-app`
3. Press Enter
4. Type: `npm start`
5. Press Enter
6. Go to: `http://localhost:3000`

---

**Made with 💝 for children learning to read!** 📚✨

*Version 2.0.0 — Fully Offline!*