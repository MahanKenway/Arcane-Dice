# Nim Language Arcane Dice
import random, strformat

randomize()

proc rollArcane(sides: int): int =
  if sides <= 0:
    return 1
  return rand(1..sides)

let 
  d20Roll = rollArcane(20)
  d100Roll = rollArcane(100)

echo "--- Nim Arcane Fate ---"
echo &"Rolled a d20: {d20Roll}"
echo &"Rolled a d100: {d100Roll}"

if d20Roll == 20:
  echo "Critical hit! Nim compiled your luck at C-speed!"
