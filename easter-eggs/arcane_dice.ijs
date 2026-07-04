NB. J Language Implicit Dice Engine
NB. High-performance vector operations on polyhedral pools

rolls =: >: 10 ?@$ 100  NB. Roll 10 d100s
sorted =: \:~ rolls    NB. Sort descending
sum =: +/ 3 {. sorted   NB. Sum of top 3 rolls

'Rolls: ' ; rolls
'Top 3 Sum: ' ; sum
