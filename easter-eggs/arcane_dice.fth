\ Forth Arcane Dice
\ Stack-based manipulation of fate and physics

: RANDOM ( n -- r )
  \ LCG random algorithm using system time variable
  TIME @ 1103515245 * 12345 + 65536 / MOD abs ;

: ROLL-ARCANE ( sides -- )
  DUP . ." -sided dice rolled: "
  RANDOM 1+ . CR ;

CR ." --- Forth Arcane Stack ---" CR
20 ROLL-ARCANE
100 ROLL-ARCANE
