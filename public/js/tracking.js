const Tracking = {
  STORAGE_KEY: 'reading-app-stats',

  getStats() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.getDefaultStats();
  },

  getDefaultStats() {
    return {
      totalWordsRead: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastReadDate: null,
      wordsByAge: {},
      wordsByCategory: {},
      sessionsCount: 0,
      firstSessionDate: null
    };
  },

  saveStats(stats) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
  },

  recordWordRead(word, age, category) {
    const stats = this.getStats();

    stats.totalWordsRead++;
    stats.sessionsCount = (stats.sessionsCount || 0) + 1;

    if (!stats.firstSessionDate) {
      stats.firstSessionDate = new Date().toISOString();
    }

    const today = new Date().toDateString();
    const lastDate = stats.lastReadDate ? new Date(stats.lastReadDate).toDateString() : null;

    if (lastDate === today) {
      stats.currentStreak++;
    } else if (lastDate === this.getYesterday()) {
      stats.currentStreak++;
    } else {
      stats.currentStreak = 1;
    }

    if (stats.currentStreak > stats.longestStreak) {
      stats.longestStreak = stats.currentStreak;
    }

    stats.lastReadDate = new Date().toISOString();

    if (age) {
      stats.wordsByAge[age] = (stats.wordsByAge[age] || 0) + 1;
    }

    if (category) {
      stats.wordsByCategory[category] = (stats.wordsByCategory[category] || 0) + 1;
    }

    this.saveStats(stats);
    return stats;
  },

  getYesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toDateString();
  },

  resetStats() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  get formattedStats() {
    const stats = this.getStats();
    return {
      totalWordsRead: stats.totalWordsRead,
      currentStreak: stats.currentStreak,
      longestStreak: stats.longestStreak,
      sessionsCount: stats.sessionsCount,
      wordsByAge: stats.wordsByAge,
      wordsByCategory: stats.wordsByCategory,
      firstSessionDate: stats.firstSessionDate,
      daysActive: this.getDaysActive(stats.firstSessionDate)
    };
  },

  getDaysActive(firstDate) {
    if (!firstDate) return 0;
    const start = new Date(firstDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  }
};