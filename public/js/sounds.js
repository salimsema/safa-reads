const Sounds = {
  audioCtx: null,

  init() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  },

  playClick() {
    if (!this.audioCtx) this.init();

    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    oscillator.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

    oscillator.start(this.audioCtx.currentTime);
    oscillator.stop(this.audioCtx.currentTime + 0.1);
  },

  playSuccess() {
    if (!this.audioCtx) this.init();

    const frequencies = [523, 659, 784];
    frequencies.forEach((freq, i) => {
      const oscillator = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime + i * 0.1);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + i * 0.1 + 0.15);

      oscillator.start(this.audioCtx.currentTime + i * 0.1);
      oscillator.stop(this.audioCtx.currentTime + i * 0.1 + 0.15);
    });
  }
};