-- Idris Type-Driven Arcane Dice Bound Safety proofs
-- Proves at compile-time that a dice roll outcome is always bounded within [1, Sides]
module ArcaneDice

import Data.Nat
import Decidable.Order

||| Evidence that roll value is strictly between 1 and the specified sides
data SafeOutcome : (sides : Nat) -> (roll : Nat) -> Type where
  ProvedSafe : {sides : Nat} -> {roll : Nat} -> (LTE 1 roll) -> (LTE roll sides) -> SafeOutcome sides roll

||| Compile-time function representing bounds assertion for arbitrary dice types
assertDiceSafety : (sides : Nat) -> (roll : Nat) -> Dec (SafeOutcome sides roll)
assertDiceSafety sides roll =
  case decLTE 1 roll of
    No contr1 => No (\(ProvedSafe p1 p2) => contr1 p1)
    Yes prf1 =>
      case decLTE roll sides of
        No contr2 => No (\(ProvedSafe p1 p2) => contr2 p2)
        Yes prf2 => Yes (ProvedSafe prf1 prf2)

||| Representation of an infallible, statically-verified d20 Roll Object
record VerifiedRoll where
  constructor MkVerifiedRoll
  sides : Nat
  value : Nat
  safetyProof : SafeOutcome sides value

||| Generator representing safe creation of rolls
createVerifiedRoll : (sides : Nat) -> (val : Nat) -> {auto 1_lte_val : LTE 1 val} -> {auto val_lte_sides : LTE val sides} -> VerifiedRoll
createVerifiedRoll s v = MkVerifiedRoll s v (ProvedSafe 1_lte_val val_lte_sides)

-- Example D20 rolls verified safely by compiler:
luckyRoll : VerifiedRoll
luckyRoll = createVerifiedRoll 20 20

unluckyRoll : VerifiedRoll
unluckyRoll = createVerifiedRoll 20 1
