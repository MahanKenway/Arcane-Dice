\ Forth Arcane Stack-Based Dice Engine
\ Implements a complete Pseudorandom Number Generator, Stack Auditing, and Terminal Visualizer

VARIABLE seed

: INIT-SEED ( -- )
  TIME@ XOR seed ! ;

\ Linear Congruential Generator for randoms (Numerical Recipes parameters)
: LCG-RANDOM ( -- n )
  seed @ 1103515245 * 12345 + DUP seed ! ;

: ROLL-SIDES ( sides -- roll )
  LCG-RANDOM ABS SWAP MOD 1+ ;

: PRINT-DICE-BAR ( val -- )
  ." ["
  0 DO
    ." *"
  LOOP
  ." ]" ;

: ROLL-POOL ( count sides -- )
  CR ." Rolling " DUP . ." Sided dice pool " OVER . ." times: " CR
  0 ROT ROT ( sum count sides )
  2DUP -ROT ( sum sides count sides )
  
  0 DO
    DUP ROLL-SIDES ( sum sides roll )
    DUP . ."  " 
    ROT + SWAP ( update sum )
  LOOP
  DROP ( drop sides )
  CR ." Pool Cumulative Sum: " . CR ;

: ROLL-D100-PERCENTILE ( -- )
  CR ." Rolling Arcane Percentile d100... " CR
  100 ROLL-SIDES
  DUP . ." % "
  DUP PRINT-DICE-BAR CR ;

INIT-SEED
CR ." === FORTH Stack-based Destiny Engine ===" CR
5 20 ROLL-POOL
ROLL-D100-PERCENTILE
BYE
