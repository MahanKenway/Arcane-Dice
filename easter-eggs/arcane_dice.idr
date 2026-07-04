-- Idris Type-Driven Arcane Dice
module ArcaneDice

import Data.Nat

-- Proof that our dice result strictly lies within [1, sides]
data BoundedRoll : (sides : Nat) -> (val : Nat) -> Type where
  InBounds : (lte : val <= sides) -> (gtZero : val > 0) -> BoundedRoll sides val

-- A d20 roll is guaranteed to be safe at compile-time
rollD20 : (val : Nat) -> {auto lte : val <= 20} -> {auto gtZero : val > 0} -> BoundedRoll 20 val
rollD20 val = InBounds lte gtZero
