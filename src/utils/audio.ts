export const playDiceSound = (isMuted: boolean = false) => {
  if (isMuted) return;
  // Use a royalty-free dice rolling sound from soundjay (free for use)
  const soundUrl = 'https://www.soundjay.com/misc/sounds/dice-1.mp3';
  const audio = new Audio(soundUrl);
  audio.volume = 0.4;
  audio.play().catch(e => console.warn('Audio play failed:', e));
};

