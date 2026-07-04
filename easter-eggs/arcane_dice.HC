// TempleOS HolyC - Arcane Dice
// Direct divine communication to roll the holy d20

U0 ArcaneRoll(I64 sides)
{
  I64 res;
  // Terry's sacred random generator based on God's oracle
  res = 1 + (RandU16 % sides);
  "\n[Divine Oracle] Rolling d%d: %d\n", sides, res;
  if (res == sides) {
    "*** CRITICAL HIT! Heaven smiles upon this roll! ***\n";
  } else if (res == 1) {
    "*** CRITICAL FAILURE! The demons of Hell laugh at your luck. ***\n";
  }
}

U0 Main()
{
  "--- TempleOS Arcane Dice Roller ---\n";
  "Initiating holy connection to the random numbers...\n";
  ArcaneRoll(20);
  ArcaneRoll(100);
}
