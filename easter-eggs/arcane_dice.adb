-- Ada High-Integrity Arcane Dice Package
with Ada.Text_IO;
with Ada.Numerics.Discrete_Random;

procedure Arcane_Dice is
   type Polyhedral_Sides is range 1 .. 100;
   package Random_Generator is new Ada.Numerics.Discrete_Random (Polyhedral_Sides);
   use Random_Generator;
   
   Gen  : Generator;
   Roll : Polyhedral_Sides;
begin
   Ada.Text_IO.Put_Line ("--- Ada Missile-Grade Dice Roller ---");
   Reset (Gen);
   Roll := Random (Gen);
   Ada.Text_IO.Put_Line ("Safe d100 Roll: " & Polyhedral_Sides'Image (Roll));
end Arcane_Dice;
