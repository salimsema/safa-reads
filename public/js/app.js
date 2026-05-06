const App = {
  container: null,
  ageSelect: document.getElementById('age'),
  newWordsBtn: document.getElementById('newWords'),
  autoShuffle: document.getElementById('autoShuffle'),
  progressEl: document.getElementById('progress'),
  currentWords: [],
  readCount: 0,
  totalWords: 0,
  autoShuffleInterval: null,
  currentCategory: null,
  isCelebration: false,
  wordBank: null,

  colors: [
    '#C0392B', '#2980B9', '#27AE60', '#8E44AD',
    '#D35400', '#16A085', '#2C3E50', '#B7472A'
  ],

  async init() {
    this.container = document.getElementById('wordContainer');
    await this.loadWordBank();
    this.newWordsBtn.addEventListener('click', () => this.loadWords(true));
    this.ageSelect.addEventListener('change', () => this.loadWords(true));
    this.autoShuffle.addEventListener('change', () => this.toggleAutoShuffle());

    const toggleBtn = document.getElementById('toggleControls');
    const controls = document.getElementById('controls');
    let controlsVisible = false;

    toggleBtn.addEventListener('click', () => {
      controlsVisible = !controlsVisible;
      controls.classList.toggle('visible', controlsVisible);
      toggleBtn.textContent = controlsVisible ? '‹' : '›';
    });

    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentCategory = e.target.dataset.category;
        this.loadWords(true);
      });
    });

    this.updateOnlineStatus();
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.relayoutCurrentWords(), 250);
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.relayoutCurrentWords(), 400);
    });

    this.loadWords(true);
  },

  relayoutCurrentWords() {
    const currentState = this.getCurrentWordState();
    if (!currentState.length) return;
    this.currentWords = currentState.map(s => s.word);
    this.readCount = currentState.filter(s => s.read).length;
    this.renderWords();
  },

  async loadWordBank() {
    try {
      const res = await fetch('/data/word-bank.json');
      this.wordBank = await res.json();
      let total = 0;
      Object.values(this.wordBank.ages).forEach(a => Object.values(a).forEach(l => total += l.length));
      console.log(`Loaded ${total} words offline-ready`);
    } catch (err) {
      console.error('Failed to load word bank:', err);
    }
  },

  getOfflineWords(age, count, category) {
    if (!this.wordBank) return [];
    
    let pool = [];
    
    if (category && this.wordBank.categories[category]) {
      pool = [...this.wordBank.categories[category]];
    } else {
      const ageData = this.wordBank.ages[age] || this.wordBank.ages['6'];
      Object.values(ageData).forEach(list => pool.push(...list));
    }
    
    // Shuffle and pick
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  },

  async loadWords(fresh = false) {
    const age = this.ageSelect.value;
    const count = 9;
    
    try {
      if (this.wordBank) {
        this.currentWords = this.getOfflineWords(age, count, this.currentCategory);
      } else {
        const url = this.currentCategory 
          ? `/api/words?category=${this.currentCategory}&count=${count}`
          : `/api/words?age=${age}&count=${count}`;
        const res = await fetch(url);
        const data = await res.json();
        this.currentWords = data.words;
      }
      
      this.readCount = 0;
      this.totalWords = 0;
      this.isCelebration = false;
      this.renderWords();
    } catch (err) {
      if (this.wordBank) {
        this.currentWords = this.getOfflineWords(age, count, this.currentCategory);
        this.readCount = 0;
        this.totalWords = 0;
        this.isCelebration = false;
        this.renderWords();
      } else {
        console.error('Failed to load words:', err);
      }
    }
  },

  updateOnlineStatus() {
    const indicator = document.getElementById('online-status');
    if (!indicator) return;
    indicator.style.display = navigator.onLine ? 'none' : 'block';
  },

  getResponsivePadding() {
    if (window.innerWidth < 600) return 24;
    if (window.innerWidth < 900) return 32;
    return 48;
  },

  getHeaderHeight() {
    const header = document.querySelector('.header');
    if (!header) return 0;
    if (!header.classList.contains('visible')) return 0;
    const rect = header.getBoundingClientRect();
    return rect.height || 0;
  },

  getSafeArea() {
    const padding = this.getResponsivePadding();
    const headerHeight = this.getHeaderHeight();
    return {
      left: padding,
      top: headerHeight + padding,
      right: window.innerWidth - padding,
      bottom: window.innerHeight - padding,
      width: window.innerWidth - padding * 2,
      height: window.innerHeight - headerHeight - padding * 2
    };
  },

  getWordGap() {
    if (window.innerWidth < 600) return 24;
    if (window.innerWidth < 900) return 32;
    return 40;
  },

  boxesOverlap(a, b, gap = 32) {
    return !(
      a.right + gap < b.left ||
      a.left > b.right + gap ||
      a.bottom + gap < b.top ||
      a.top > b.bottom + gap
    );
  },

  getResponsiveWordCount() {
    const width = window.innerWidth;
    const area = width * window.innerHeight;
    if (width < 600) return 5;
    if (width < 900) return 7;
    if (area < 900000) return 8;
    if (area < 1600000) return 10;
    return 12;
  },

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  },

  getFontSizeForWord(word, safeArea) {
    const baseSizes = {
      3: [5, 6.5],
      4: [4.5, 6],
      5: [4, 5.5],
      6: [3.5, 5],
      7: [3, 4.5],
      8: [2.8, 4],
      9: [2.5, 3.5],
      10: [2.2, 3]
    };
    const len = Math.min(word.length, 10);
    const range = baseSizes[len] || baseSizes[10];
    const fontRem = this.random(range[0], range[1]);
    return fontRem;
  },

  fitWordToViewport(el, safeArea) {
    let fontSize = parseFloat(window.getComputedStyle(el).fontSize);
    const minFontSize = 36;
    while (el.getBoundingClientRect().width > safeArea.width && fontSize > minFontSize) {
      fontSize -= 4;
      el.style.fontSize = `${fontSize}px`;
    }
  },

  createAndMeasureWord(word, fontSize, color, rotation) {
    const el = document.createElement('div');
    el.className = 'word';
    el.textContent = word;
    el.dataset.word = word;
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.top = '-9999px';
    el.style.visibility = 'hidden';
    el.style.fontSize = `${fontSize}rem`;
    el.style.color = color;
    el.style.transform = `rotate(${rotation}deg)`;
    document.body.appendChild(el);
    const rect = el.getBoundingClientRect();
    el.style.visibility = 'visible';
    return { el, width: rect.width, height: rect.height };
  },

  getCurrentWordState() {
    return Array.from(document.querySelectorAll('.word')).map(el => ({
      word: el.dataset.word || el.textContent.trim(),
      read: el.classList.contains('read')
    }));
  },

  renderWords() {
    this.container.innerHTML = '';

    const w = window.innerWidth;
    const h = window.innerHeight;

    const padX      = Math.max(24, w * 0.04);
    const padTop    = Math.max(60, h * 0.08);
    const padBottom = Math.max(24, h * 0.05);

    const safeLeft   = padX;
    const safeRight  = w - padX;
    const safeTop    = padTop;
    const safeBottom = h - padBottom;
    const safeW      = safeRight - safeLeft;
    const safeH      = safeBottom - safeTop;

    const cols  = w < 500 ? 2 : (w < 900 ? 3 : 4);
    const rows  = 3;
    const zoneW = safeW / cols;
    const zoneH = safeH / rows;

    const zones = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        zones.push({ col: c, row: r });
      }
    }
    for (let i = zones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zones[i], zones[j]] = [zones[j], zones[i]];
    }

    const words = [...this.currentWords].slice(0, zones.length);
    const currentState = this.getCurrentWordState();
    const stateMap = new Map(currentState.map(s => [s.word, s.read]));

    this.totalWords = words.length;
    this.updateProgressDisplay();

    words.forEach((word, i) => {
      const zone = zones[i];

      const zoneLeft  = safeLeft + zone.col * zoneW;
      const zoneTop   = safeTop  + zone.row * zoneH;
      const zoneRight = zoneLeft + zoneW;
      const zoneBot   = zoneTop  + zoneH;

      const len          = word.length;
      const maxByLength  = Math.min(zoneW / (len * 0.55), zoneH * 0.55);
      const fontSize     = Math.max(22, maxByLength);

      const el = document.createElement('div');
      el.className       = 'word';
      el.textContent     = word;
      el.dataset.word    = word;
      el.style.position  = 'absolute';
      el.style.fontSize  = fontSize + 'px';
      el.style.color     = this.colors[i % this.colors.length];
      el.style.whiteSpace = 'nowrap';
      el.style.lineHeight = '1.2';
      el.style.padding   = '2px 4px';
      el.style.boxSizing = 'border-box';

      const estWidth  = len * fontSize * 0.62;
      const estHeight = fontSize * 1.3;
      const innerPad  = 8;

      const minX = zoneLeft  + innerPad;
      const maxX = zoneRight - estWidth  - innerPad;
      const minY = zoneTop   + innerPad;
      const maxY = zoneBot   - estHeight - innerPad;

      const x = minX < maxX ? minX + Math.random() * (maxX - minX) : minX;
      const y = minY < maxY ? minY + Math.random() * (maxY - minY) : minY;

      el.style.left = Math.round(x) + 'px';
      el.style.top  = Math.round(y) + 'px';

      if (stateMap.get(word)) {
        el.classList.add('read');
        el.dataset.read = 'true';
      }

      el.onclick = () => this.handleWordClick(el, word);
      this.container.appendChild(el);
    });
  },

  handleWordClick(el, word) {
    if (el.classList.contains('read')) return;

    Speech.speak(word);

    el.classList.add('read');
    el.classList.add('celebrate');

    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    el.appendChild(sparkle);

    Sounds.playClick();

    const age = this.ageSelect.value;
    Tracking.recordWordRead(word, age, this.currentCategory);

    this.readCount++;
    this.updateProgressDisplay();

    if (this.readCount === this.totalWords) {
      setTimeout(() => this.showCelebration(), 500);
    }
  },

  showCelebration() {
    Sounds.playSuccess();
    this.isCelebration = true;

    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.textContent = '🎉 Amazing! You read them all! 🎉';
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      this.loadWords();
    }, 3000);
  },

  toggleAutoShuffle() {
    if (this.autoShuffle.checked) {
      this.autoShuffleInterval = setInterval(() => this.loadWords(), 60000);
    } else {
      clearInterval(this.autoShuffleInterval);
    }
  },

  updateProgressDisplay() {
    if (this.progressEl) {
      this.progressEl.textContent = `Read: ${this.readCount} / ${this.totalWords} ⭐`;
    }
  },

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

// Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.style.display = 'inline-flex';
    installBtn.addEventListener('click', async () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install outcome:', outcome);
      deferredPrompt = null;
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('Safa Reads installed!');
  deferredPrompt = null;
  const installBtn = document.getElementById('install-btn');
  if (installBtn) installBtn.style.display = 'none';
});