# Raku (Formerly Perl 6) Arcane Dice
# Multi-dispatch signatures for rolling various game systems

multi sub roll-fate(Int $sides where * > 0) {
    my $roll = (1..$sides).pick;
    say "Raku rolled a d$sides: $roll";
    return $roll;
}

multi sub roll-fate('advantage') {
    my @rolls = (1..20).pick(2);
    say "Raku rolled d20 with ADVANTAGE: {@rolls} -> Selected: {@rolls.max}";
    return @rolls.max;
}

say "--- Raku Arcane Multi-paradigm Roller ---";
roll-fate(100);
roll-fate('advantage');
