export const playDiceSound = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  
  // Create an oscillator for the "thud"
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // A wooden "thud" / plastic "clack" type of sound
  osc.type = 'triangle';
  
  const now = ctx.currentTime;
  
  // Frequency envelope - sharp drop for a percussive sound
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
  
  // Amplitude envelope - very short decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  
  osc.start(now);
  osc.stop(now + 0.12);
  
  // Add a slight high-frequency "clink" component
  const osc2 = ctx.createOscillator();
  const gainNode2 = ctx.createGain();
  osc2.connect(gainNode2);
  gainNode2.connect(ctx.destination);
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(2000, now);
  osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
  
  gainNode2.gain.setValueAtTime(0, now);
  gainNode2.gain.linearRampToValueAtTime(0.1, now + 0.01);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
  
  osc2.start(now);
  osc2.stop(now + 0.06);
};
