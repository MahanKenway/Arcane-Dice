⍝ APL Arcane Array Roller
⍝ Rolls multiple dice arrays and filters top results instantly

rolls ← ? 5 ⍴ 20       ⍝ Roll 5 d20s
highest ← ⌈/ rolls     ⍝ Get maximum roll
sum ← +/ rolls         ⍝ Total sum of rolls

'APL Rolls: ' rolls
'Highest Fate: ' highest
'Sum of Destiny: ' sum
