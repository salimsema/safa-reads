const Speech = {
  synth: window.speechSynthesis,

  speak(word) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      return false;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    const voices = this.synth.getVoices();
    const childVoice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Princess') ||
      v.name.includes('Daniel') ||
      v.name.includes('English')
    ) || voices[0];

    if (childVoice) {
      utterance.voice = childVoice;
    }

    this.synth.speak(utterance);
    return true;
  },

  isSupported() {
    return !!this.synth;
  }
};