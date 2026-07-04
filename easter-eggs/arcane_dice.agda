-- Agda Proof-Assistant Arcane Dice
module arcane_dice where

open import Data.Nat
open import Relation.Binary.PropositionalEquality

-- A rigorous definition of a valid dice outcome
data ValidRoll (sides : ℕ) : ℕ → Set where
  proven-safe : (val : ℕ) 
              → (val ≤ sides) 
              → (1 ≤ val) 
              → ValidRoll sides val
