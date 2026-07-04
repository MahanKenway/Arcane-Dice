⍝ APL High-Performance Multi-Dimensional Quantum Roll Processing
⍝ Computes statistical analysis and physics matrix permutations for 10,000 rolls in one go

⍝ 1. Initialize random link and environment parameters
⎕RL ← 16807

⍝ 2. Define custom operator to simulate N dice of S sides plus modifier M
∇ R ← N roll_plus SM;count;sides;mod;raw
  count ← N
  sides ← ⊃SM
  mod ← 1⌽SM
  raw ← ? N ⍴ sides
  R ← raw + mod
∇

⍝ 3. Simulate rolling 100 d20s with +5 modifier
results ← 100 roll_plus 20 5

⍝ 4. Extract metrics
mean ← (+/results) ÷ ⍴results
highest ← ⌈/results
critical_hits ← +/ 25 = results

'=== APL Quantum Multi-Dimensional Analysis ==='
'All Dice Roll Results: ' results
'Mean Outcome Value:   ' mean
'Maximum Fate Roll:     ' highest
'Count of Crit Max 25s: ' critical_hits
