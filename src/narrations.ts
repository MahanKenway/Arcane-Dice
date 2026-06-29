export const getNarrativeForRoll = (roll: number, max: number = 20): string => {
  if (roll === 1) {
    const criticalFailures = [
      "A catastrophic miscalculation. The world seems to conspire against you.",
      "You stumble at the worst possible moment. Wasted.",
      "One does not simply roll a 1. The Eye of Sauron is judging you.",
      "I've got a bad feeling about this...",
      "Reality is often disappointing.",
      "You had ONE job!",
      "My disappointment is immeasurable, and my day is ruined.",
      "I am never going to financially recover from this.",
      "Emotional damage! The dice have forsaken you.",
      "Did you put your name in the Goblet of Fire, Harry?! ...Dumbledore asked calmly.",
      "Congratulations, you played yourself.",
      "Another happy landing... said no one ever.",
      "You were the Chosen One! You were supposed to destroy the 1s, not join them!",
      "Houston, we have a problem. A really big, critical problem.",
      "An elegant failure for a less civilized age.",
      "Fly, you fools! ...Oh wait, you just fell off the cliff instead.",
      "F in the chat for this tragic attempt.",
      "A natural 1. You question your life choices as everything falls apart.",
      "Your confidence betrays you. An abysmal outcome.",
      "A spectacular failure that will be sung about in taverns as a cautionary tale.",
      "Oof. I think you got a bit of the bad juju there.",
      "You died. (Dark Souls death screen intensifies)",
      "WASTED. Better luck in the next spawn.",
      "It is time to delete this character.",
      "My expectations were low but holy cow.",
      "This roll belongs in a museum... of what not to do.",
      "A series of unfortunate events, concentrated in one single roll.",
      "You've activated my trap card!",
      "I'm not mad, I'm just disappointed.",
      "Roll 1 to pay respects.",
      "D'oh! That did not go as planned.",
      "That was not very cash money of you.",
      "Look at the bright side: it can't possibly get any worse. (Or can it?)",
      "I'm in danger! *giggles nervously*",
      "This is fine. (Everything is on fire in the background)",
      "To the shadow realm you go!",
      "Well, that was a free trial of absolute failure."
    ];
    return criticalFailures[Math.floor(Math.random() * criticalFailures.length)];
  }

  if (roll === max) {
    const criticalSuccesses = [
      "UNLIMITED POWER! Masterful form!",
      "I am inevitable. A flawless, legendary execution.",
      "You strike with godlike precision and devastating force.",
      "The stars align. This is where the fun begins!",
      "Maximum effort! You exceed all expectations.",
      "It's over! You have the high ground now.",
      "Absolutely legendary. They will write sagas about this day.",
      "Flawless victory! Outstanding move.",
      "I have become Death, the destroyer of worlds... or at least this challenge.",
      "You're goddamn right. Perfection incarnate.",
      "The weave of magic bends to your will. A glorious triumph.",
      "Behold! The ultimate manifestation of fate.",
      "A stroke of absolute brilliance! To infinity and beyond!",
      "The impossible becomes reality. A perfect natural roll!",
      "Show me the money! A masterpiece of a roll.",
      "Say hello to my little friend! (It's a maximum roll!)",
      "Outstanding move! Modern problems require outstanding rolls.",
      "Chewie, we're home. Perfection is here.",
      "Is this the real life? Is this just fantasy? Yes, a perfect roll!",
      "They said it could not be done. You proved them wrong.",
      "I'm the king of the world!",
      "Witness me! Shiny and chrome!",
      "Go ahead, make my day. And you just did!",
      "Limitless Power!",
      "Like a boss! Totally crushed it.",
      "Houston, we have liftoff! Excellent peak performance.",
      "That is America's roll.",
      "You have chosen... wisely.",
      "Nothing is impossible! JUST DO IT!",
      "Apex performance. The Gods of RNG are smiling upon you.",
      "That's a lot of damage! (To your foes, that is)",
      "He's too dangerous to be left alive!",
      "A roll fit for a hero of legend."
    ];
    return criticalSuccesses[Math.floor(Math.random() * criticalSuccesses.length)];
  }

  const percentage = roll / max;

  if (percentage <= 0.3) {
    const lows = [
      "I am asking you once again to roll better.",
      "So you're saying there's a chance? ...Nope, that's still pretty bad.",
      "Not great, not terrible... Actually, no, it's pretty terrible.",
      "Look how they massacred my boy.",
      "This is not the roll you are looking for.",
      "You tried so hard, and got so far. But in the end, it doesn't even matter.",
      "Task failed successfully. Better luck next time.",
      "That's rough, buddy.",
      "Please insert 25 cents to try again.",
      "Are you not entertained? No, because that was a terrible attempt.",
      "It is honest work, but barely.",
      "A weak showing. The outcome is less than favorable.",
      "You hesitate, and the opportunity slips away.",
      "Clumsy and awkward. The universe sighs.",
      "Oof, size: LARGE.",
      "Press F to pay respects to this roll.",
      "We don't make mistakes, just happy accidents. Let's call this a very happy accident.",
      "Are ya winning, son? ...Clearly not with that roll.",
      "You can't handle the truth! (The truth is this roll is pretty weak).",
      "My precious! ...Wait, no, don't look at it, it's terrible.",
      "Is this some kind of peasant joke I'm too lucky to understand?",
      "Aw, did someone get addicted to low rolls?",
      "Houston, we've had a minor setback.",
      "You tried. Star sticker for effort! ⭐",
      "Not quite the chosen one, are you?",
      "Reality check: You need to blow on the dice next time."
    ];
    return lows[Math.floor(Math.random() * lows.length)];
  }

  if (percentage <= 0.7) {
    const mediums = [
      "Perfectly balanced, as all things should be.",
      "Not great, not terrible. Exactly 3.6 Roentgen of luck.",
      "It's a simple spell, but quite unbreakable.",
      "May the rolls be ever in your favor.",
      "This is the way. Standard, reliable, average.",
      "A wizard is never late, nor is he early. He rolls precisely what he means to.",
      "You shall not pass! ...Well, actually, you might pass, it's a decent attempt.",
      "Elementary, my dear Watson. Quite standard.",
      "I can do this all day. (Proceeds to roll perfectly average numbers).",
      "An average effort. It might just be enough.",
      "You do what is necessary, nothing more.",
      "A standard execution yielding standard results.",
      "Acceptable, though entirely unimpressive.",
      "You hold your ground, but gain no clear advantage.",
      "Honest work. It ain't much, but it's honest.",
      "Just keep swimming, just keep swimming.",
      "It is acceptable. Not mind-blowing, but it gets the job done.",
      "You are on this council, but we do not grant you the rank of Master.",
      "Help me, Obi-Wan Kenobi, you're my only hope... for an average result.",
      "Keep your secrets then. Just a standard average roll.",
      "Not a triumph, but certainly not a disaster.",
      "A perfectly mundane outcome. The crowd is politely quiet.",
      "Balanced on the edge of greatness and failure.",
      "You survived. No more, no less."
    ];
    return mediums[Math.floor(Math.random() * mediums.length)];
  }

  const highs = [
    "I am Iron Man. A highly effective effort.",
    "Is it possible to learn this power?",
    "Look at me. I'm the captain now.",
    "He's beginning to believe! Excellent execution.",
    "Great kid, don't get cocky!",
    "You're breathtaking!",
    "They're taking the Hobbits to Isengard!",
    "That still only counts as one! A powerful attempt.",
    "I am the one who knocks! Striking with great confidence.",
    "You're a wizard, Harry. Admirably precise.",
    "There is no spoon. You bend reality in your favor.",
    "A solid, skilled maneuver. You strike true.",
    "You execute your plan with admirable precision.",
    "A powerful attempt that connects solidly.",
    "You push past the obstacles with striking confidence.",
    "Excellent! Bill & Ted would be proud.",
    "I feel the need... the need for speed! And high rolls!",
    "With great power comes great rolls.",
    "I see this as an absolute win!",
    "Very nice, how much? High quality roll.",
    "A surprise, to be sure, but a welcome one.",
    "May the Force be with you. It clearly is.",
    "So civilized. A masterful showing.",
    "A near-perfect strike. The enemies are sweating.",
    "Impressive. Most impressive."
  ];
  return highs[Math.floor(Math.random() * highs.length)];
};
