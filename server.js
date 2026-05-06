const express = require('express');
const NodeCache = require('node-cache');
const https = require('https');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;
const APP_NAME = 'safa-read-app';

const cache = new NodeCache({ stdTTL: 86400 });

app.use(express.static('public'));
app.use(express.json());

// PWA routes
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

app.get('/service-worker.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public', 'service-worker.js'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

async function fetchDatamuseWords(pattern, max = 20) {
  return new Promise((resolve, reject) => {
    const url = `https://api.datamuse.com/words?sp=${pattern}&md=f&max=${max}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const words = JSON.parse(data);
          const filtered = words.filter(w => w.tags && w.tags.includes('f:3'));
          resolve(filtered.map(w => w.word));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

app.get('/api/words', async (req, res) => {
  const { age: ageStr, count = 15, fresh, category, useDatamuse } = req.query;
  const age = parseInt(ageStr);

  if (category) {
    const catKey = category.toLowerCase();
    const validCategories = ['animals', 'colors', 'food', 'family', 'numbers'];
    
    if (!validCategories.includes(catKey)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const cacheKey = `cat_${catKey}_${count}`;
    const cached = cache.get(cacheKey);
    if (cached && !fresh) {
      return res.json(cached);
    }

    try {
      const categories = require('./data/categories.json');
      const catWords = categories[catKey] || [];
      const shuffled = catWords.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(count, catWords.length));
      
      const result = { words: selected, category: catKey };
      cache.set(cacheKey, result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch category words' });
    }
    return;
  }

  if (!age || age < 5 || age > 8) {
    return res.status(400).json({ error: 'Age must be between 5 and 8' });
  }

  const cacheKey = `words_${age}_${count}`;

  if (!fresh) {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
  }

  try {
    const sightWords = require('./data/sight-words.json');
    const ageKey = `age_${age}`;
    let localWords = sightWords[ageKey] || [];

    if (useDatamuse && age >= 6) {
      const patterns = { 5: '??', 6: '???', 7: '????', 8: '?????' };
      const pattern = patterns[age] || '????';
      const datamuseWords = await fetchDatamuseWords(pattern, 50);
      const filtered = datamuseWords.filter(w => w.length === parseInt(pattern.replace(/\?/g, '')));
      if (filtered.length > 0) {
        localWords = [...new Set([...localWords, ...filtered])];
      }
    }

    const shuffled = localWords.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    const result = { words: selected, age };
    cache.set(cacheKey, result);

    res.json(result);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  
  console.log(`\n🚀 Safa Read App is running!\n`);
  console.log(`📱 Local:    http://localhost:${PORT}`);
  console.log(`💻 Network:  http://${localIP}:${PORT}\n`);
  
  console.log(`📝 Access from other devices on same WiFi using the IP above\n`);
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}