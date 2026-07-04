package arcane_dice

import "core:fmt"
import "core:math/rand"

main :: proc() {
	fmt.println("--- Odin Systems Polyhedral Roller ---")
	
	// Simulating robust game engine physics ticks
	d20_roll := rand.int_31_max(20) + 1
	d100_roll := rand.int_31_max(100) + 1
	
	fmt.printf("[Odin Engine] d20 result: %d\n", d20_roll)
	fmt.printf("[Odin Engine] d100 result: %d\n", d100_roll)
}
