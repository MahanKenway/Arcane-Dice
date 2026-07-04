-- Ada 2012 High-Integrity Safe Concurrency Engine
-- Leverages strong types, range constraints, and task components to roll dice safely.

with Ada.Text_IO;
with Ada.Numerics.Discrete_Random;

procedure Arcane_Dice is

   type Dice_Range is range 1 .. 100;
   
   -- Safe protected object to buffer multi-threaded logging safely
   protected Concurrent_Logger is
      procedure Log_Roll (Dice_ID : Integer; Value : Dice_Range);
   end Concurrent_Logger;

   protected body Concurrent_Logger is
      procedure Log_Roll (Dice_ID : Integer; Value : Dice_Range) is
      begin
         Ada.Text_IO.Put_Line ("[TASK DICE" & Integer'Image (Dice_ID) & 
                               "] Landing settled safely. Value =" & 
                               Dice_Range'Image (Value));
      end Log_Roll;
   end Concurrent_Logger;

   -- Concurrent task simulating a dice falling in parallel
   task type Dice_Fall_Task (ID : Integer; Sides : Dice_Range) is
      entry Trigger_Fall;
   end Dice_Fall_Task;

   task body Dice_Fall_Task is
      package Random_Dice_Pkg is new Ada.Numerics.Discrete_Random (Dice_Range);
      use Random_Dice_Pkg;
      Gen  : Generator;
      Roll : Dice_Range;
   begin
      accept Trigger_Fall;
      Reset (Gen);
      
      -- Run LCG loops representing tumbling physics rotation
      for Index in 1 .. 5 loop
         Roll := Random (Gen) mod Sides + 1;
      end loop;
      
      Concurrent_Logger.Log_Roll (ID, Roll);
   end Dice_Fall_Task;

   -- Instantiate arrays of concurrent tasks
   Task_1 : Dice_Fall_Task (ID => 101, Sides => 20);
   Task_2 : Dice_Fall_Task (ID => 102, Sides => 100);

begin
   Ada.Text_IO.Put_Line ("=== Ada Avionics-Grade Concurrent Sandbox ===");
   
   -- Fire concurrent tasks
   Task_1.Trigger_Fall;
   Task_2.Trigger_Fall;
end Arcane_Dice;
