import json

critical_failures = [
  "The fates have abandoned you.",
  "Even goblins expected better.",
  "A spectacular disaster unfolds.",
  "Fortune looks the other way.",
  "The dungeon claims another victim.",
  "Somewhere, a lich is laughing.",
  "Your ancestors collectively sighed.",
  "Even your dice seem embarrassed.",
  "Chaos answers before courage.",
  "The crows will remember this day.",
  "A painful lesson has been learned.",
  "The darkness celebrates your mistake.",
  "The worst path was somehow chosen.",
  "The gods remain silent.",
  "Misfortune has excellent timing.",
  "The dungeon feeds on failures like this.",
  "That could have gone better.",
  "Every legend has its embarrassing chapter.",
  "Fate rolled against you.",
  "Better pretend nobody saw that."
]

low_rolls = [
  "Fortune seems distracted.",
  "The shadows grow longer.",
  "The dungeon hungers for mistakes.",
  "A poor omen.",
  "Luck slips away.",
  "Even heroes stumble.",
  "Better stay alert.",
  "Darkness inches closer.",
  "The path grows uncertain.",
  "The fates remain unconvinced.",
  "Hope flickers, but survives.",
  "Not your finest moment.",
  "Every setback teaches something.",
  "The enemy senses weakness.",
  "Better prepare for what's next.",
  "Your confidence wavers.",
  "The torch burns a little dimmer.",
  "The silence feels heavier.",
  "The dice demand patience.",
  "Trouble stirs nearby."
]

neutrals = [
  "The story goes on.",
  "Nothing gained, nothing lost.",
  "A fair outcome.",
  "Every journey has ordinary steps.",
  "The dice remain mysterious.",
  "The road stretches onward.",
  "The outcome is... acceptable.",
  "Not every tale begins with glory.",
  "Fate keeps its secrets.",
  "Another page in the adventure.",
  "Balance has its place.",
  "The next roll may tell a different story.",
  "Keep moving.",
  "The quest is far from over.",
  "Sometimes surviving is enough.",
  "The dungeon remains silent.",
  "One roll does not define a hero.",
  "The fire still burns.",
  "An expected result.",
  "Adventure waits around the corner."
]

good_rolls = [
  "A promising omen.",
  "Luck lends you a helping hand.",
  "Better than most adventurers could hope for.",
  "A worthy roll.",
  "Fortune remains your companion.",
  "The road ahead seems brighter.",
  "Your confidence is well placed.",
  "The winds favor your journey.",
  "A respectable outcome.",
  "Not legendary... but close.",
  "The odds lean in your favor.",
  "Success whispers your name.",
  "A skilled adventurer would be proud.",
  "The next challenge feels smaller already.",
  "A spark of destiny reveals itself.",
  "Your instincts rarely fail.",
  "Courage and fortune meet halfway.",
  "The adventure continues in your favor.",
  "A clean victory begins with a roll like this.",
  "Even fate nods in approval."
]

critical_successes = [
  "The Weave bends to your will.",
  "Even the stars approve of this fate.",
  "The gods have smiled upon you today.",
  "Your legend grows with every roll.",
  "Fortune walks proudly at your side.",
  "A hero couldn't have asked for better.",
  "The dungeon trembles before your resolve.",
  "Destiny has chosen its champion.",
  "Every path now leads to glory.",
  "Victory was written long before this roll.",
  "The old magic answers your call.",
  "Even dragons would respect that throw.",
  "Your enemies suddenly feel less confident.",
  "The air itself crackles with triumph.",
  "The tavern bards just found their next song.",
  "The dice sing of greatness.",
  "Every gamble has led to this moment.",
  "A flawless stroke of fate.",
  "The realm itself seems to cheer.",
  "Fortune owes you no explanation."
]

legendary = [
  "Reality hesitates for a heartbeat.",
  "Even the Dungeon Master raises an eyebrow.",
  "The Weave itself applauds.",
  "Somewhere, an ancient dragon smiles.",
  "A forgotten prophecy just came true.",
  "Time pauses to admire your luck.",
  "Destiny has been thoroughly confused.",
  "The dice remember your name.",
  "Every tavern will tell this story differently.",
  "History quietly changes course."
]

code = f"""export const getNarrativeForRoll = (roll: number, max: number = 20): string => {{
  // 0.1% chance for Legendary
  if (Math.random() < 0.001) {{
    const legendaries = {json.dumps(legendary, indent=4).replace('    ', '      ')};
    return legendaries[Math.floor(Math.random() * legendaries.length)];
  }}

  const percentage = roll / max;

  if (percentage <= 0.2) {{
    const criticalFailures = {json.dumps(critical_failures, indent=4).replace('    ', '      ')};
    return criticalFailures[Math.floor(Math.random() * criticalFailures.length)];
  }}

  if (percentage <= 0.45) {{
    const lows = {json.dumps(low_rolls, indent=4).replace('    ', '      ')};
    return lows[Math.floor(Math.random() * lows.length)];
  }}

  if (percentage <= 0.65) {{
    const mediums = {json.dumps(neutrals, indent=4).replace('    ', '      ')};
    return mediums[Math.floor(Math.random() * mediums.length)];
  }}

  if (percentage <= 0.85) {{
    const highs = {json.dumps(good_rolls, indent=4).replace('    ', '      ')};
    return highs[Math.floor(Math.random() * highs.length)];
  }}

  const criticalSuccesses = {json.dumps(critical_successes, indent=4).replace('    ', '      ')};
  return criticalSuccesses[Math.floor(Math.random() * criticalSuccesses.length)];
}};
"""

with open('src/narrations.ts', 'w') as f:
    f.write(code)
