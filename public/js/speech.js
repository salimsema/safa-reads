const Speech = {
  synth: window.speechSynthesis,

  speak(word) {
    if (!this.synth) return false;

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    const voices = this.synth.getVoices();

    // Pick best English voice, priority order
    const voice =
      voices.find(v => v.name.includes('Samantha')) ||
      voices.find(v => v.name.includes('Daniel')) ||
      voices.find(v => v.lang === 'en-US' && v.localService) ||
      voices.find(v => v.lang === 'en-GB' && v.localService) ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang === 'en-GB') ||
      voices.find(v => v.lang.startsWith('en')) ||
      null; // let browser decide — utterance.lang='en-US' still helps

    if (voice) utterance.voice = voice;

    this.synth.speak(utterance);
    return true;
  },

  isSupported() {
    return !!this.synth;
  }
};