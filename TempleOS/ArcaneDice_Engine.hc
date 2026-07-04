/*========================================================
    ARCANE DICE ENGINE (HOLYC EDITION)
    Author: Mahan Tavakoli
    Project: Arcane Dice
    Version: 1.0.0

    A TempleOS-inspired probability engine for fate rolling
=========================================================*/

#define MAX_QUOTES 16

I64 global_luck = 0;
I64 global_curse = 0;

/*========================
        UTILITIES
==========================*/

U0 PrintLine()
{
    "--------------------------------------------\n";
}

U0 SleepLike(I64 ticks)
{
    // fake delay loop (TempleOS style vibe)
    I64 i;
    for (i = 0; i < ticks * 10000; i++)
        asm { nop };
}

/*========================
        RNG CORE
==========================*/

I64 Roll(I64 sides)
{
    if (sides <= 0)
        return 0;

    return Rand % sides + 1;
}

I64 RollAdvantage(I64 sides)
{
    I64 a = Roll(sides);
    I64 b = Roll(sides);

    if (a > b)
        return a;
    else
        return b;
}

I64 RollDisadvantage(I64 sides)
{
    I64 a = Roll(sides);
    I64 b = Roll(sides);

    if (a < b)
        return a;
    else
        return b;
}

/*========================
        FATE SYSTEM
==========================*/

U0 UpdateFate(I64 roll, I64 sides)
{
    if (roll == 1)
        global_curse++;

    if (roll == sides)
        global_luck++;
}

U0 PrintFateState()
{
    "Luck Level: %d\n", global_luck;
    "Curse Level: %d\n", global_curse;

    if (global_curse > global_luck)
        "Status: The system dislikes you.\n";
    else if (global_luck > global_curse)
        "Status: The universe favors you.\n";
    else
        "Status: Balanced fate.\n";
}

/*========================
        ROLL DISPLAY
==========================*/

U0 PrintRoll(I64 roll, I64 sides)
{
    "Rolling d%d...\n", sides;
    SleepLike(1);

    "Result: %d\n", roll;

    if (roll == 1)
        ">>> CRITICAL FAILURE\n";
    else if (roll == sides)
        ">>> CRITICAL SUCCESS\n";
}

/*========================
        DICE ENGINE
==========================*/

U0 RollDice(I64 sides)
{
    I64 r = Roll(sides);

    PrintRoll(r, sides);
    UpdateFate(r, sides);

    PrintLine();
}

U0 RollBatch()
{
    "=== BATCH ROLL ===\n";

    RollDice(4);
    RollDice(6);
    RollDice(8);
    RollDice(10);
    RollDice(12);
    RollDice(20);
    RollDice(100);
}

/*========================
        ADVANCED SYSTEM
==========================*/

U0 RitualRoll()
{
    "=== RITUAL ROLL ===\n";

    I64 base = Roll(20);
    I64 modifier = global_luck - global_curse;

    I64 final = base + modifier;

    "Base Roll: %d\n", base;
    "Modifier: %d\n", modifier;
    "Final Value: %d\n", final;

    if (final >= 25)
        "Outcome: GODLIKE ASCENSION\n";
    else if (final >= 15)
        "Outcome: Successful Fate\n";
    else if (final >= 8)
        "Outcome: Neutral Path\n";
    else
        "Outcome: Disaster\n";

    PrintLine();
}

/*========================
        LORE SYSTEM
==========================*/

U0 PrintLore()
{
    Str lore[MAX_QUOTES] =
    {
        "The dice remember your sins.",
        "Luck is just delayed probability.",
        "Every roll is a decision made by chaos.",
        "The system is watching.",
        "You cannot escape randomness.",
        "Even certainty is an illusion.",
        "Fate is just math pretending to be magic.",
        "The abyss computes your outcome.",
        "Entropy always wins in the end.",
        "A perfect roll is a rare apology from reality.",
        "You are not lucky. You are observed.",
        "Every number has consequences.",
        "The dice do not care.",
        "Reality has no reroll button.",
        "What you call chance is just hidden truth.",
        "Some outcomes are already decided."
    };

    "=== ARCANE LORE ===\n";
    "%s\n", lore[Rand % MAX_QUOTES];
}

/*========================
        UI HEADER
==========================*/

U0 PrintHeader()
{
    "\n====================================\n";
    "      ARCANE DICE ENGINE\n";
    "   TempleOS Inspired Edition\n";
    "   Creator: Mahan Tavakoli\n";
    "====================================\n\n";
}

/*========================
        MAIN ENGINE LOOP
==========================*/

U0 Main()
{
    PrintHeader();

    "Initializing Arcane Engine...\n";
    SleepLike(2);

    "Loading probability matrix...\n";
    SleepLike(1);

    "Binding fate system...\n";
    SleepLike(1);

    PrintLine();

    RollBatch();

    RitualRoll();

    PrintFateState();

    PrintLine();

    PrintLore();

    PrintLine();

    "Session complete.\n";
    "— Mahan Tavakoli\n";
}

/* ENTRY POINT */
Main;
