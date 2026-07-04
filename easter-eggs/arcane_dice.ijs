NB. J Tacit Probability Convolution and Dice Statistics System
NB. Computes probability distributions of complex dice pools without state loops

NB. Define monadic verb to generate probabilities for a single S-sided die
die_dist =: (1 & %) @ (1 & +) @ i.

NB. Convolution of two probability vectors (simulating dice addition)
convolve =: +//. @ (*/)

NB. Dyadic verb to compute exact probability distribution of N d S
NB. Example: 3 dice_pool 6 returns probability vector for 3d6
dice_pool =: [ : convolve/ die_dist @ ]

NB. Mean and Variance computations
mean =: +/ @: (* i. @ #)
variance =: [ - *&2 @ mean

NB. Run simulation metrics
prob_3d20 =: 3 dice_pool 20
expected_mean =: mean prob_3d20

'=== J Language Vectorized Mathematics ==='
'Probability of rolling minimum score: ' ; 0 { prob_3d20
'Mathematical Expected Value of 3d20:   ' ; expected_mean
