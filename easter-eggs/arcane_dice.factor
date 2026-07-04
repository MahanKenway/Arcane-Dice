! Factor Arcane Dice Roller
USING: io random kernel math formatting system ;
IN: arcane-dice

: roll-dice ( sides -- )
    dup [ 1 [1,b] random ] [ "%d-sided dice rolled: %d\n" printf ] bi ;

"--- Factor Concatenative Roller ---" print
20 roll-dice
100 roll-dice
